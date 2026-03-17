/**
 * Structured error hierarchy with consistent HTTP status mapping
 * Replaces ad-hoc string errors throughout the codebase
 */

export abstract class AppError extends Error {
	abstract readonly statusCode: number;
	abstract readonly errorType: string;

	constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
		Object.setPrototypeOf(this, new.target.prototype);
	}

	toJSON() {
		return {
			error: this.message,
			type: this.errorType,
		};
	}
}

export class ValidationError extends AppError {
	readonly statusCode = 400;
	readonly errorType = 'validation_error';
}

export class AuthenticationError extends AppError {
	readonly statusCode = 403;
	readonly errorType = 'authentication_error';
}

export class NotFoundError extends AppError {
	readonly statusCode = 404;
	readonly errorType = 'not_found';
}

export class RateLimitError extends AppError {
	readonly statusCode = 429;
	readonly errorType = 'rate_limit';
	
	constructor(message: string = 'Tactical cooling in progress. Too many requests.') {
		super(message);
	}
}

export class PayloadTooLargeError extends AppError {
	readonly statusCode = 413;
	readonly errorType = 'payload_too_large';
	
	constructor(message: string = 'Payload too large (Limit: 1MB).') {
		super(message);
	}
}

export class AIError extends AppError {
	readonly statusCode = 500;
	readonly errorType = 'ai_error';
	
	constructor(message: string = 'AI Forge failed.') {
		super(message);
	}
}

export class InternalError extends AppError {
	readonly statusCode = 500;
	readonly errorType = 'internal_error';
	
	constructor(message: string = 'Internal server error') {
		super(message);
	}
}

export class ExternalServiceError extends AppError {
	readonly statusCode = 502;
	readonly errorType = 'external_service_error';

	constructor(message: string = 'External service unavailable') {
		super(message);
	}
}

/**
 * Converts AppError to JSON Response with proper status code
 */
export function errorResponse(error: AppError): Response {
	return new Response(JSON.stringify(error.toJSON()), {
		status: error.statusCode,
		headers: { 'Content-Type': 'application/json' }
	});
}

/**
 * Safe error handler for catch blocks
 * Converts unknown errors to proper AppError responses
 */
export function handleError(error: unknown): Response {
	if (error instanceof AppError) {
		return errorResponse(error);
	}
	
	if (error instanceof Error) {
		console.error('Unhandled error:', error.message, error.stack);
		return errorResponse(new InternalError(error.message));
	}
	
	console.error('Unknown error:', error);
	return errorResponse(new InternalError('An unexpected error occurred'));
}
