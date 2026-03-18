import { Env, ZeusSimulation } from '../core/types';
import { ZEUS_HTML } from '../ui/zeus';
import { validateZeusRequest } from '../core/validation';
import { handleValidatedRequest } from '../core/middleware';
import { htmlPage, generateUniqueId } from '../core/utils';

const NUM_ITERATIONS = 1000;
const MAX_YEARS = 60;

// Crisis severity bounds (20-40% wealth reduction)
const CRISIS_SEVERITY_MIN = 0.20;
const CRISIS_SEVERITY_MAX = 0.40;

export async function handleZeusGet(): Promise<Response> {
	return htmlPage(ZEUS_HTML);
}

/**
 * Run Monte Carlo simulation for retirement planning
 * Uses Box-Muller transform for generating normally distributed returns
 * 
 * Features:
 * - Salary growth: Income compounds annually at specified rate
 * - Crisis events: Random wealth drops (20-40% severity) simulating market crashes
 * - Comparison: Shows success probability with vs without crises
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
			
			// Track crisis data for visualization
			const crisisYearFrequency: Map<number, number> = new Map();
			
			// Parallel tracking for comparison (without crises)
			const finalValuesNoCrisis: number[] = [];
			const yearsToFireNoCrisis: number[] = [];

			for (let i = 0; i < NUM_ITERATIONS; i++) {
				const path: number[] = [currentSavings];
				let balance = currentSavings;
				let fireYear = -1;
				let currentIncome = income;
				
				// Parallel path WITHOUT crises (for comparison)
				let balanceNoCrisis = currentSavings;
				let fireYearNoCrisis = -1;
				let currentIncomeNoCrisis = income;
				
				// Generate crisis years and severities for this iteration
				const crisisData: { year: number; severity: number }[] = [];
				if (crisisEvents > 0) {
					const availableYears = Array.from({ length: yearsToSimulate }, (_, idx) => idx);
					shuffleArray(availableYears);
					for (let c = 0; c < Math.min(crisisEvents, yearsToSimulate); c++) {
						const crisisYear = availableYears[c];
						const severity = CRISIS_SEVERITY_MIN + Math.random() * (CRISIS_SEVERITY_MAX - CRISIS_SEVERITY_MIN);
						crisisData.push({ year: crisisYear, severity });
						
						// Track crisis year frequency
						crisisYearFrequency.set(crisisYear, (crisisYearFrequency.get(crisisYear) || 0) + 1);
					}
				}
				const crisisYearSet = new Set(crisisData.map(c => c.year));
				const crisisSeverityMap = new Map(crisisData.map(c => [c.year, c.severity]));

				for (let year = 0; year < yearsToSimulate; year++) {
					// Thai retirement age: income stops at 60
					const currentAge = age + year;
					const isRetired = currentAge >= 60;
					
					// Calculate this year's savings (income grows with salary growth until retirement)
					if (year > 0 && salaryGrowth > 0 && !isRetired) {
						currentIncome = currentIncome * (1 + salaryGrowth);
						currentIncomeNoCrisis = currentIncomeNoCrisis * (1 + salaryGrowth);
					}
					
					// No income/savings after retirement age 60
					const annualSavings = isRetired ? 0 : currentIncome * savingsRate;
					const annualSavingsNoCrisis = isRetired ? 0 : currentIncomeNoCrisis * savingsRate;
					
					// Generate random return using Box-Muller transform
					const u1 = Math.random();
					const u2 = Math.random();
					const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
					
					// Apply random return with mean and volatility
					const yearlyReturn = realReturnMean + volatility * z;
					
					// WITH crises path
					balance = balance * (1 + yearlyReturn);
					if (crisisYearSet.has(year)) {
						const severity = crisisSeverityMap.get(year) || 0.30;
						balance = balance * (1 - severity);
					}
					balance = balance + annualSavings;
					balance = Math.max(0, balance);
					path.push(balance);
					if (fireYear === -1 && balance >= retirementTarget) {
						fireYear = year + 1;
					}
					
					// WITHOUT crises path (parallel simulation)
					balanceNoCrisis = balanceNoCrisis * (1 + yearlyReturn);
					balanceNoCrisis = balanceNoCrisis + annualSavingsNoCrisis;
					balanceNoCrisis = Math.max(0, balanceNoCrisis);
					if (fireYearNoCrisis === -1 && balanceNoCrisis >= retirementTarget) {
						fireYearNoCrisis = year + 1;
					}
				}

				iterations.push(path);
				finalValues.push(balance);
				yearsToFire.push(fireYear === -1 ? yearsToSimulate : fireYear);
				
				// Track no-crisis results
				finalValuesNoCrisis.push(balanceNoCrisis);
				yearsToFireNoCrisis.push(fireYearNoCrisis === -1 ? yearsToSimulate : fireYearNoCrisis);
			}

			// Calculate statistics (WITH crises)
			finalValues.sort((a, b) => a - b);
			yearsToFire.sort((a, b) => a - b);

			const medianFinal = calculatePercentile(finalValues, 50);
			const p10 = calculatePercentile(finalValues, 10);
			const p90 = calculatePercentile(finalValues, 90);
			const medianYearsToFire = calculatePercentile(yearsToFire.filter(y => y < yearsToSimulate), 50) || yearsToSimulate;
			const successCount = yearsToFire.filter(y => y < yearsToSimulate).length;
			const successProbability = successCount / NUM_ITERATIONS;

			// Calculate statistics (WITHOUT crises - for comparison)
			finalValuesNoCrisis.sort((a, b) => a - b);
			yearsToFireNoCrisis.sort((a, b) => a - b);
			const successCountNoCrisis = yearsToFireNoCrisis.filter(y => y < yearsToSimulate).length;
			const successProbabilityNoCrisis = successCountNoCrisis / NUM_ITERATIONS;

			// Calculate median path (year-by-year median across all iterations)
			const medianPath: number[] = [currentSavings];
			for (let year = 1; year <= yearsToSimulate; year++) {
				const yearValues = iterations.map(it => it[year]).sort((a, b) => a - b);
				medianPath.push(calculatePercentile(yearValues, 50));
			}

			// Find top crisis years (most frequently occurring across iterations)
			const topCrisisYears: number[] = [];
			if (crisisEvents > 0) {
				const sortedYears = Array.from(crisisYearFrequency.entries())
					.sort((a, b) => b[1] - a[1])
					.slice(0, crisisEvents)
					.map(([year]) => year);
				topCrisisYears.push(...sortedYears);
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
					medianPath,
					medianFinal,
					p10,
					p90,
					successProbability,
					medianYearsToFire,
					successProbabilityNoCrisis,
					crisisYears: topCrisisYears
				},
				createdAt: Date.now()
			};

			// Store for 1 day (optional - can be stateless)
			await env.SHORT_LINKS.put(id, JSON.stringify(result), { expirationTtl: 86400 });

			// Return results
			return {
				id,
				medianFinal,
				p10,
				p90,
				successProbability,
				successProbabilityNoCrisis,
				medianYearsToFire,
				medianPath,
				crisisYears: topCrisisYears,
				iterations: iterations.slice(0, 200)
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
