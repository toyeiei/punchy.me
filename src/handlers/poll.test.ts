import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handlePollGet, handlePollCreate, handlePollVote, handlePollView } from './poll';
import { Env, PollData } from '../core/types';

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

// Mock request
const createRequest = (body?: unknown, headers?: Record<string, string>): Request => {
	return new Request('http://localhost/poll', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
		body: body ? JSON.stringify(body) : undefined,
	});
};

describe('POLL PUNCH Handler', () => {
	let env: Env;

	beforeEach(() => {
		env = createMockEnv();
		vi.clearAllMocks();
	});

	describe('handlePollGet', () => {
		it('should return HTML page', async () => {
			const response = await handlePollGet();
			expect(response.status).toBe(200);
			expect(response.headers.get('Content-Type')).toBe('text/html');
			const html = await response.text();
			expect(html).toContain('POLL PUNCH');
		});
	});

	describe('handlePollCreate', () => {
		it('should create a poll with valid data', async () => {
			const request = createRequest({
				question: 'What feature should we build next?',
				options: ['Feature A', 'Feature B', 'Feature C'],
			});

			const response = await handlePollCreate(request, env);
			expect(response.status).toBe(200);
			
			const data = await response.json() as { id: string };
			expect(data.id).toBeDefined();
			expect(data.id.length).toBe(6);

			// Verify KV put was called
			expect(env.SHORT_LINKS.put).toHaveBeenCalled();
		});

		it('should reject poll without question', async () => {
			const request = createRequest({
				options: ['Option A', 'Option B'],
			});

			const response = await handlePollCreate(request, env);
			expect(response.status).toBe(400);
		});

		it('should reject poll with too few options', async () => {
			const request = createRequest({
				question: 'Test question?',
				options: ['Only one option'],
			});

			const response = await handlePollCreate(request, env);
			expect(response.status).toBe(400);
		});

		it('should reject poll with too many options', async () => {
			const request = createRequest({
				question: 'Test question?',
				options: ['A', 'B', 'C', 'D', 'E'],
			});

			const response = await handlePollCreate(request, env);
			expect(response.status).toBe(400);
		});

		it('should detect bot via honeypot', async () => {
			const request = createRequest({
				question: 'Test question?',
				options: ['A', 'B'],
				hp_field: 'bot-fill',
			});

			const response = await handlePollCreate(request, env);
			expect(response.status).toBe(403);
		});
	});

	describe('handlePollVote', () => {
		it('should record a vote on valid poll', async () => {
			const pollData: PollData = {
				type: 'poll',
				question: 'Test question?',
				options: ['A', 'B'],
				votes: [0, 0],
				createdAt: Date.now(),
			};

			(env.SHORT_LINKS.get as ReturnType<typeof vi.fn>)
				.mockResolvedValueOnce(JSON.stringify(pollData))
				.mockResolvedValueOnce(null); // No previous vote

			const request = createRequest({ optionIndex: 0 }, { 'cf-connecting-ip': '1.2.3.4' });
			const response = await handlePollVote(request, env, 'abc123');

			expect(response.status).toBe(200);
			const data = await response.json() as { success: boolean; votes: number[] };
			expect(data.success).toBe(true);
			expect(data.votes[0]).toBe(1);
		});

		it('should reject vote on non-existent poll', async () => {
			(env.SHORT_LINKS.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce(null);

			const request = createRequest({ optionIndex: 0 });
			const response = await handlePollVote(request, env, 'nonexistent');

			expect(response.status).toBe(404);
		});

		it('should handle vote tracking', async () => {
			const pollData: PollData = {
				type: 'poll',
				question: 'Test question?',
				options: ['A', 'B'],
				votes: [5, 3],
				createdAt: Date.now(),
			};

			(env.SHORT_LINKS.get as ReturnType<typeof vi.fn>)
				.mockResolvedValueOnce(JSON.stringify(pollData))
				.mockResolvedValueOnce(null);

			const request = createRequest({ optionIndex: 0 }, { 'cf-connecting-ip': '1.2.3.4' });
			await handlePollVote(request, env, 'abc123');

			// Verify vote was stored
			expect(env.SHORT_LINKS.put).toHaveBeenCalled();
		});

		it('should reject vote on expired poll', async () => {
			const expiredPoll: PollData = {
				type: 'poll',
				question: 'Old poll',
				options: ['A', 'B'],
				votes: [5, 3],
				createdAt: Date.now() - (25 * 60 * 60 * 1000), // 25 hours ago
			};

			(env.SHORT_LINKS.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce(JSON.stringify(expiredPoll));

			const request = createRequest({ optionIndex: 0 });
			const response = await handlePollVote(request, env, 'expired');

			expect(response.status).toBe(410);
		});
	});

	describe('handlePollView', () => {
		it('should render poll view page', async () => {
			const pollData: PollData = {
				type: 'poll',
				question: 'Test question?',
				options: ['A', 'B'],
				votes: [5, 3],
				createdAt: Date.now(),
			};

			(env.SHORT_LINKS.get as ReturnType<typeof vi.fn>)
				.mockResolvedValueOnce(JSON.stringify(pollData))
				.mockResolvedValueOnce(null); // No vote

			const request = new Request('http://localhost/poll/abc123');
			const response = await handlePollView(request, env, 'abc123');

			expect(response.status).toBe(200);
			const html = await response.text();
			expect(html).toContain('Test question?');
		});

		it('should show "not found" for missing poll', async () => {
			(env.SHORT_LINKS.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce(null);

			const request = new Request('http://localhost/poll/missing');
			const response = await handlePollView(request, env, 'missing');

			expect(response.status).toBe(200);
			const html = await response.text();
			expect(html).toContain('Poll Not Found');
		});
	});
});
