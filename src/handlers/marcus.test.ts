import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleMarcusGet } from './marcus';
import { Env } from '../core/types';

// Mock environment
const createMockEnv = (): Env => ({
	SHORT_LINKS: {
		get: vi.fn(),
		put: vi.fn(),
	} as unknown as KVNamespace,
	AI: {
		run: vi.fn().mockResolvedValue({
			response: JSON.stringify({
				explanation: 'The mean represents the average value...',
			}),
		}),
	} as unknown as Ai,
	BROWSER: {
		connect: vi.fn(),
		disconnect: vi.fn(),
	},
	TURNSTILE_SITE_KEY: 'test-site-key',
	TURNSTILE_SECRET_KEY: 'test-secret-key',
	UNSPLASH_ACCESS_KEY: 'test-unsplash-key',
});

const createRequest = (body?: unknown): Request => {
	return new Request('http://localhost/marcus/explain', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'cf-connecting-ip': '1.2.3.4',
		},
		body: body ? JSON.stringify(body) : undefined,
	});
};

describe('MARCUS Handler', () => {
	let env: Env;

	beforeEach(() => {
		env = createMockEnv();
		vi.clearAllMocks();
	});

	describe('handleMarcusGet', () => {
		it('should return HTML page', async () => {
			const response = await handleMarcusGet();
			expect(response.status).toBe(200);
			expect(response.headers.get('Content-Type')).toBe('text/html');
			const html = await response.text();
			expect(html).toContain('MARCUS');
		});

		it('should include webR script', async () => {
			const response = await handleMarcusGet();
			const html = await response.text();
			expect(html).toContain('webr.r-wasm.org');
		});

		it('should include analysis templates', async () => {
			const response = await handleMarcusGet();
			const html = await response.text();
			expect(html).toContain('Quick Summary');
			expect(html).toContain('Compare Groups');
			expect(html).toContain('Find Trend');
		});
	});

	describe('handleMarcusExplain', () => {
		it('should return explanation for valid template', async () => {
			const request = createRequest({
				template: 'summary',
				data: 'sales\n100\n200\n150',
			});

			// Import handler dynamically to avoid circular deps
			const { handleMarcusExplain } = await import('./marcus');
			const response = await handleMarcusExplain(request, env);

			expect(response.status).toBe(200);
			const data = await response.json() as { explanation: string };
			expect(data.explanation).toBeDefined();
		});

		it('should reject request without template', async () => {
			const request = createRequest({
				data: 'sales\n100\n200',
			});

			const { handleMarcusExplain } = await import('./marcus');
			const response = await handleMarcusExplain(request, env);

			expect(response.status).toBe(400);
		});

		it('should reject request without data', async () => {
			const request = createRequest({
				template: 'summary',
			});

			const { handleMarcusExplain } = await import('./marcus');
			const response = await handleMarcusExplain(request, env);

			expect(response.status).toBe(400);
		});

		it('should reject data over 10000 characters', async () => {
			const largeData = 'x\n' + '1\n'.repeat(10001);
			const request = createRequest({
				template: 'summary',
				data: largeData,
			});

			const { handleMarcusExplain } = await import('./marcus');
			const response = await handleMarcusExplain(request, env);

			expect(response.status).toBe(400);
		});

		it('should detect bot via honeypot', async () => {
			const request = createRequest({
				template: 'summary',
				data: 'sales\n100',
				hp_field: 'bot-fill',
			});

			const { handleMarcusExplain } = await import('./marcus');
			const response = await handleMarcusExplain(request, env);

			expect(response.status).toBe(403);
		});
	});
});
