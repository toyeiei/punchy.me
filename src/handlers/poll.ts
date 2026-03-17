import { Env, PollData } from '../core/types';
import { POLL_FORM_HTML, generatePollVoteHTML } from '../ui/poll';
import { validatePollCreateRequest, validatePollVoteRequest } from '../core/validation';
import { handleValidatedRequest } from '../core/middleware';
import { jsonResponse, htmlPage, generateUniqueId } from '../core/utils';
import { checkRateLimit } from '../services/security';
import { handleError } from '../core/errors';

/** 24 hour TTL in seconds */
const POLL_TTL = 86400;

export async function handlePollGet(): Promise<Response> {
	return htmlPage(POLL_FORM_HTML);
}

export async function handlePollCreate(request: Request, env: Env): Promise<Response> {
	return handleValidatedRequest(
		request,
		env,
		validatePollCreateRequest,
		async (data, ip, env) => {
			// Additional rate limit for poll creation
			const allowed = await checkRateLimit(env, `rl:poll-create:${ip}`, 5, 60);
			if (!allowed) {
				return jsonResponse({ error: 'Too many polls created. Wait a minute.' }, 429);
			}

			const id = generateUniqueId(6);
			const pollData: PollData = {
				type: 'poll',
				question: data.question,
				options: data.options,
				votes: data.options.map(() => 0),
				createdAt: Date.now()
			};

			await env.SHORT_LINKS.put(id, JSON.stringify(pollData), { expirationTtl: POLL_TTL });
			return { id };
		},
		{ rateLimit: { key: 'poll', limit: 10, ttl: 60 } }
	);
}

export async function handlePollVote(request: Request, env: Env, pollId: string): Promise<Response> {
	try {
		// Get poll data
		const raw = await env.SHORT_LINKS.get(pollId);
		if (!raw) {
			return jsonResponse({ error: 'Poll not found or expired' }, 404);
		}

		const poll = JSON.parse(raw) as PollData;
		if (poll.type !== 'poll') {
			return jsonResponse({ error: 'Invalid poll' }, 400);
		}

		// Check if poll expired (24 hours)
		if (Date.now() - poll.createdAt > POLL_TTL * 1000) {
			return jsonResponse({ error: 'Poll has expired' }, 410);
		}

		// Parse and validate vote
		let body: unknown;
		try {
			body = await request.json();
		} catch {
			return jsonResponse({ error: 'Invalid request' }, 400);
		}

		const validation = validatePollVoteRequest(body);
		if (!validation.success || !validation.data) {
			return jsonResponse({ error: validation.error || 'Invalid request' }, 400);
		}

		const { optionIndex, hp_field } = validation.data;

		// Honeypot check
		if (hp_field) {
			return jsonResponse({ error: 'Bot detected' }, 403);
		}

		// Validate option index against actual poll options
		if (optionIndex >= poll.options.length) {
			return jsonResponse({ error: 'Invalid option' }, 400);
		}

		// Rate limit voting per IP
		const ip = request.headers.get('cf-connecting-ip') || 'anonymous';
		const allowed = await checkRateLimit(env, `rl:poll-vote:${ip}`, 20, 60);
		if (!allowed) {
			return jsonResponse({ error: 'Too many votes. Slow down.' }, 429);
		}

		// Check if already voted (per-poll tracking)
		const votedKey = `poll-voted:${pollId}:${ip}`;
		const alreadyVoted = await env.SHORT_LINKS.get(votedKey);
		if (alreadyVoted) {
			return jsonResponse({ error: 'You already voted on this poll' }, 403);
		}

		// Increment vote
		poll.votes[optionIndex]++;

		// Save updated poll
		await env.SHORT_LINKS.put(pollId, JSON.stringify(poll), { expirationTtl: POLL_TTL });

		// Mark as voted (expires with poll)
		await env.SHORT_LINKS.put(votedKey, '1', { expirationTtl: POLL_TTL });

		return jsonResponse({ success: true, votes: poll.votes });
	} catch (error) {
		return handleError(error);
	}
}

export async function handlePollView(request: Request, env: Env, pollId: string): Promise<Response> {
	try {
		const raw = await env.SHORT_LINKS.get(pollId);
		if (!raw) {
			return htmlPage(`<html><body style="background:#000;color:#fff;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;"><h1 style="color:#22c55e;">Poll Not Found</h1><p style="color:#888;">This poll may have expired.</p><a href="/poll" style="color:#22c55e;margin-top:1rem;">Create a new poll →</a></body></html>`);
		}

		const poll = JSON.parse(raw) as PollData;
		if (poll.type !== 'poll') {
			return htmlPage(`<html><body style="background:#000;color:#fff;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;"><h1 style="color:#ef4444;">Invalid Poll</h1></body></html>`);
		}

		// Check if expired
		if (Date.now() - poll.createdAt > POLL_TTL * 1000) {
			return htmlPage(`<html><body style="background:#000;color:#fff;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;"><h1 style="color:#f59e0b;">Poll Expired</h1><p style="color:#888;">This poll is no longer active.</p><a href="/poll" style="color:#22c55e;margin-top:1rem;">Create a new poll →</a></body></html>`);
		}

		// Check if user already voted
		const ip = request.headers.get('cf-connecting-ip') || 'anonymous';
		const votedKey = `poll-voted:${pollId}:${ip}`;
		const hasVoted = !!(await env.SHORT_LINKS.get(votedKey));

		const totalVotes = poll.votes.reduce((a, b) => a + b, 0);
		const html = generatePollVoteHTML(pollId, poll.question, poll.options, poll.votes, totalVotes, hasVoted);

		return htmlPage(html);
	} catch (error) {
		return handleError(error);
	}
}
