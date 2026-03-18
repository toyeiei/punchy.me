import { Env, ZeusSimulation } from '../core/types';
import { ZEUS_HTML } from '../ui/zeus';
import { validateZeusRequest } from '../core/validation';
import { handleValidatedRequest } from '../core/middleware';
import { htmlPage, generateUniqueId } from '../core/utils';

const NUM_ITERATIONS = 1000;
const MAX_YEARS = 60;
const CRISIS_IMPACT = 0.30; // 30% wealth reduction per crisis

export async function handleZeusGet(): Promise<Response> {
	return htmlPage(ZEUS_HTML);
}

/**
 * Run Monte Carlo simulation for retirement planning
 * Uses Box-Muller transform for generating normally distributed returns
 * 
 * Features:
 * - Salary growth: Income compounds annually at specified rate
 * - Crisis events: Random wealth drops simulating market crashes, pandemics, etc.
 */
export async function handleZeusSimulate(request: Request, env: Env): Promise<Response> {
	return handleValidatedRequest(
		request,
		env,
		validateZeusRequest,
		async (data, _ip, env) => {
			const {
				age,
				income,
				savingsRate,
				currentSavings,
				returnRate,
				inflationRate,
				retirementTarget,
				salaryGrowth,
				crisisEvents
			} = data;

			// Calculate years to simulate (up to age 100)
			const yearsToSimulate = Math.min(100 - age, MAX_YEARS);
			
			// Real return rate (adjusted for inflation volatility)
			const realReturnMean = returnRate - inflationRate;
			const volatility = 0.15; // 15% standard deviation (typical market volatility)

			// Run 1000 Monte Carlo iterations
			const iterations: number[][] = [];
			const finalValues: number[] = [];
			const yearsToFire: number[] = [];

			for (let i = 0; i < NUM_ITERATIONS; i++) {
				const path: number[] = [currentSavings];
				let balance = currentSavings;
				let fireYear = -1;
				let currentIncome = income;
				
				// Generate crisis years for this iteration (if any)
				const crisisYears = new Set<number>();
				if (crisisEvents > 0) {
					const availableYears = Array.from({ length: yearsToSimulate }, (_, i) => i);
					shuffleArray(availableYears);
					for (let c = 0; c < Math.min(crisisEvents, yearsToSimulate); c++) {
						crisisYears.add(availableYears[c]);
					}
				}

				for (let year = 0; year < yearsToSimulate; year++) {
					// Calculate this year's savings (income grows with salary growth)
					if (year > 0 && salaryGrowth > 0) {
						currentIncome = currentIncome * (1 + salaryGrowth);
					}
					const annualSavings = currentIncome * savingsRate;
					
					// Generate random return using Box-Muller transform
					const u1 = Math.random();
					const u2 = Math.random();
					const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
					
					// Apply random return with mean and volatility
					const yearlyReturn = realReturnMean + volatility * z;
					
					// Grow balance with return
					balance = balance * (1 + yearlyReturn);
					
					// Apply crisis if this is a crisis year (BEFORE adding savings)
					if (crisisYears.has(year)) {
						balance = balance * (1 - CRISIS_IMPACT);
					}
					
					// Add annual savings
					balance = balance + annualSavings;
					
					// Ensure non-negative
					balance = Math.max(0, balance);
					
					path.push(balance);

					// Check if FIRE target reached
					if (fireYear === -1 && balance >= retirementTarget) {
						fireYear = year + 1;
					}
				}

				iterations.push(path);
				finalValues.push(balance);
				yearsToFire.push(fireYear === -1 ? yearsToSimulate : fireYear);
			}

			// Calculate statistics
			finalValues.sort((a, b) => a - b);
			yearsToFire.sort((a, b) => a - b);

			const medianFinal = calculatePercentile(finalValues, 50);
			const p10 = calculatePercentile(finalValues, 10);
			const p90 = calculatePercentile(finalValues, 90);
			const medianYearsToFire = calculatePercentile(yearsToFire.filter(y => y < yearsToSimulate), 50) || yearsToSimulate;

			// Success probability (reached target within simulation period)
			const successCount = yearsToFire.filter(y => y < yearsToSimulate).length;
			const successProbability = successCount / NUM_ITERATIONS;

			// Calculate median path (year-by-year median across all iterations)
			const medianPath: number[] = [currentSavings];
			for (let year = 1; year <= yearsToSimulate; year++) {
				const yearValues = iterations.map(it => it[year]).sort((a, b) => a - b);
				medianPath.push(calculatePercentile(yearValues, 50));
			}

			// Store result for potential sharing
			const id = generateUniqueId(6);
			const result: ZeusSimulation = {
				type: 'zeus',
				inputs: {
					age,
					income,
					savingsRate,
					currentSavings,
					returnRate,
					inflationRate,
					retirementTarget,
					salaryGrowth,
					crisisEvents
				},
				results: {
					iterations,
					medianFinal,
					p10,
					p90,
					successProbability,
					medianYearsToFire
				},
				createdAt: Date.now()
			};

			// Store for 1 day (optional - can be stateless)
			await env.SHORT_LINKS.put(id, JSON.stringify(result), { expirationTtl: 86400 });

			// Return results (without all iterations to keep response size manageable)
			return {
				id,
				medianFinal,
				p10,
				p90,
				successProbability,
				medianYearsToFire,
				medianPath,
				iterations: iterations.slice(0, 200) // Return 200 sample paths for charting
			};
		},
		{ rateLimit: { key: 'zeus', limit: 10, ttl: 60 } }
	);
}

/**
 * Calculate percentile of sorted array
 */
function calculatePercentile(sortedArray: number[], percentile: number): number {
	if (sortedArray.length === 0) return 0;
	const index = Math.floor((percentile / 100) * sortedArray.length);
	return sortedArray[Math.min(index, sortedArray.length - 1)];
}

/**
 * Fisher-Yates shuffle for random crisis year selection
 */
function shuffleArray<T>(array: T[]): void {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
