import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleZeusGet, handleZeusSimulate } from './zeus';
import { Env } from '../core/types';

// Mock environment
const createMockEnv = (): Env => ({
	SHORT_LINKS: {
		get: vi.fn(),
		put: vi.fn(),
	} as unknown as KVNamespace,
	AI: {} as Ai,
	BROWSER: {
		connect: vi.fn(),
		disconnect: vi.fn(),
	},
	TURNSTILE_SITE_KEY: 'test-site-key',
	TURNSTILE_SECRET_KEY: 'test-secret-key',
	UNSPLASH_ACCESS_KEY: 'test-unsplash-key',
});

const createRequest = (body?: unknown): Request => {
	return new Request('http://localhost/zeus/simulate', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'cf-connecting-ip': '1.2.3.4',
		},
		body: body ? JSON.stringify(body) : undefined,
	});
};

describe('ZEUS Handler', () => {
	let env: Env;

	beforeEach(() => {
		env = createMockEnv();
		vi.clearAllMocks();
	});

	describe('handleZeusGet', () => {
		it('should return HTML page', async () => {
			const response = await handleZeusGet();
			expect(response.status).toBe(200);
			expect(response.headers.get('Content-Type')).toBe('text/html');
			const html = await response.text();
			expect(html).toContain('ZEUS');
		});

		it('should include Chart.js', async () => {
			const response = await handleZeusGet();
			const html = await response.text();
			expect(html).toContain('chart.js');
		});

		it('should include input sliders', async () => {
			const response = await handleZeusGet();
			const html = await response.text();
			expect(html).toContain('type="range"');
			expect(html).toContain('id="age"');
			expect(html).toContain('id="savingsRate"');
		});

		it('should include salary growth slider', async () => {
			const response = await handleZeusGet();
			const html = await response.text();
			expect(html).toContain('id="salaryGrowth"');
		});

		it('should include crisis events slider', async () => {
			const response = await handleZeusGet();
			const html = await response.text();
			expect(html).toContain('id="crisisEvents"');
		});

		it('should include Monte Carlo badge', async () => {
			const response = await handleZeusGet();
			const html = await response.text();
			expect(html).toContain('1,000 Monte Carlo');
		});
	});

	describe('handleZeusSimulate', () => {
		it('should run simulation with valid inputs', async () => {
			const request = createRequest({
				age: 35,
				income: 100000,
				savingsRate: 25,
				currentSavings: 50000,
				returnRate: 7,
				inflationRate: 3,
				retirementTarget: 1000000,
				salaryGrowth: 5,
				crisisEvents: 0,
			});

			const response = await handleZeusSimulate(request, env);
			expect(response.status).toBe(200);

			const data = await response.json() as {
				id: string;
				medianFinal: number;
				p10: number;
				p90: number;
				successProbability: number;
				medianYearsToFire: number;
				medianPath: number[];
				successProbabilityNoCrisis?: number;
				crisisYears?: number[];
				iterations: number[][];
			};

			expect(data.id).toBeDefined();
			expect(data.medianFinal).toBeGreaterThan(0);
			expect(data.p10).toBeLessThan(data.p90);
			expect(data.successProbability).toBeGreaterThanOrEqual(0);
			expect(data.successProbability).toBeLessThanOrEqual(1);
			expect(data.iterations.length).toBeGreaterThan(0);
			expect(data.medianPath).toBeDefined();
			expect(data.medianPath.length).toBeGreaterThan(0);
		});

		it('should run simulation with crisis events', async () => {
			const request = createRequest({
				age: 35,
				income: 100000,
				savingsRate: 25,
				currentSavings: 50000,
				returnRate: 7,
				inflationRate: 3,
				retirementTarget: 1000000,
				salaryGrowth: 5,
				crisisEvents: 3,
			});

			const response = await handleZeusSimulate(request, env);
			expect(response.status).toBe(200);

			const data = await response.json() as { 
				successProbability: number;
				successProbabilityNoCrisis?: number;
				crisisYears?: number[];
			};
			expect(data.successProbability).toBeGreaterThanOrEqual(0);
			expect(data.successProbabilityNoCrisis).toBeDefined();
			expect(data.crisisYears).toBeDefined();
			expect(data.crisisYears?.length).toBe(3);
		});

		it('should run simulation with salary growth', async () => {
			const request = createRequest({
				age: 30,
				income: 80000,
				savingsRate: 20,
				currentSavings: 30000,
				returnRate: 7,
				inflationRate: 3,
				retirementTarget: 500000,
				salaryGrowth: 10,
				crisisEvents: 0,
			});

			const response = await handleZeusSimulate(request, env);
			expect(response.status).toBe(200);
		});

		it('should store result in KV', async () => {
			const request = createRequest({
				age: 30,
				income: 80000,
				savingsRate: 20,
				currentSavings: 30000,
				returnRate: 7,
				inflationRate: 3,
				retirementTarget: 500000,
				salaryGrowth: 5,
				crisisEvents: 0,
			});

			await handleZeusSimulate(request, env);
			expect(env.SHORT_LINKS.put).toHaveBeenCalled();
		});

		it('should reject invalid age (too young)', async () => {
			const request = createRequest({
				age: 10,
				income: 50000,
				savingsRate: 10,
				currentSavings: 0,
				returnRate: 7,
				inflationRate: 3,
				retirementTarget: 100000,
				salaryGrowth: 5,
				crisisEvents: 0,
			});

			const response = await handleZeusSimulate(request, env);
			expect(response.status).toBe(400);
		});

		it('should reject invalid age (too old)', async () => {
			const request = createRequest({
				age: 90,
				income: 50000,
				savingsRate: 10,
				currentSavings: 0,
				returnRate: 7,
				inflationRate: 3,
				retirementTarget: 100000,
				salaryGrowth: 5,
				crisisEvents: 0,
			});

			const response = await handleZeusSimulate(request, env);
			expect(response.status).toBe(400);
		});

		it('should reject negative income', async () => {
			const request = createRequest({
				age: 35,
				income: -1000,
				savingsRate: 10,
				currentSavings: 0,
				returnRate: 7,
				inflationRate: 3,
				retirementTarget: 100000,
				salaryGrowth: 5,
				crisisEvents: 0,
			});

			const response = await handleZeusSimulate(request, env);
			expect(response.status).toBe(400);
		});

		it('should reject savings rate over 100%', async () => {
			const request = createRequest({
				age: 35,
				income: 50000,
				savingsRate: 150,
				currentSavings: 0,
				returnRate: 7,
				inflationRate: 3,
				retirementTarget: 100000,
				salaryGrowth: 5,
				crisisEvents: 0,
			});

			const response = await handleZeusSimulate(request, env);
			expect(response.status).toBe(400);
		});

		it('should reject extreme return rate', async () => {
			const request = createRequest({
				age: 35,
				income: 50000,
				savingsRate: 20,
				currentSavings: 0,
				returnRate: 60,
				inflationRate: 3,
				retirementTarget: 100000,
				salaryGrowth: 5,
				crisisEvents: 0,
			});

			const response = await handleZeusSimulate(request, env);
			expect(response.status).toBe(400);
		});

		it('should reject invalid salary growth', async () => {
			const request = createRequest({
				age: 35,
				income: 100000,
				savingsRate: 25,
				currentSavings: 50000,
				returnRate: 7,
				inflationRate: 3,
				retirementTarget: 1000000,
				salaryGrowth: 150,
				crisisEvents: 0,
			});

			const response = await handleZeusSimulate(request, env);
			expect(response.status).toBe(400);
		});

		it('should reject too many crisis events', async () => {
			const request = createRequest({
				age: 35,
				income: 100000,
				savingsRate: 25,
				currentSavings: 50000,
				returnRate: 7,
				inflationRate: 3,
				retirementTarget: 1000000,
				salaryGrowth: 5,
				crisisEvents: 50,
			});

			const response = await handleZeusSimulate(request, env);
			expect(response.status).toBe(400);
		});

		it('should detect bot via honeypot', async () => {
			const request = createRequest({
				age: 35,
				income: 100000,
				savingsRate: 25,
				currentSavings: 50000,
				returnRate: 7,
				inflationRate: 3,
				retirementTarget: 1000000,
				salaryGrowth: 5,
				crisisEvents: 0,
				hp_field: 'bot-fill',
			});

			const response = await handleZeusSimulate(request, env);
			expect(response.status).toBe(403);
		});

		it('should produce consistent simulation results', async () => {
			// Run same simulation twice and verify structure
			const request = createRequest({
				age: 30,
				income: 100000,
				savingsRate: 30,
				currentSavings: 50000,
				returnRate: 7,
				inflationRate: 3,
				retirementTarget: 1000000,
				salaryGrowth: 5,
				crisisEvents: 2,
			});

			const response = await handleZeusSimulate(request, env);
			const data = await response.json() as { 
				medianFinal: number; 
				p10: number; 
				p90: number;
				successProbability: number;
				successProbabilityNoCrisis?: number;
			};

			// Verify percentiles are in correct order
			expect(data.p10).toBeLessThanOrEqual(data.medianFinal);
			expect(data.medianFinal).toBeLessThanOrEqual(data.p90);
			
			// Verify probability is valid
			expect(data.successProbability).toBeGreaterThanOrEqual(0);
			expect(data.successProbability).toBeLessThanOrEqual(1);
			
			// Crisis comparison: without crises should be >= with crises
			expect(data.successProbabilityNoCrisis).toBeDefined();
			expect(data.successProbabilityNoCrisis).toBeGreaterThanOrEqual(data.successProbability);
		});
	});
});
