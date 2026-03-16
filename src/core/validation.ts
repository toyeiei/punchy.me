/**
 * Runtime input validation utilities
 * Provides type-safe parsing of incoming request payloads
 */

export interface ValidationResult<T> {
	success: boolean;
	data?: T;
	error?: string;
}

/**
 * Validates that a value is a non-empty string
 */
export function isNonEmptyString(value: unknown): value is string {
	return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Validates that a value is a string (can be empty)
 */
export function isString(value: unknown): value is string {
	return typeof value === 'string';
}

/**
 * Validates that a value is a number
 */
export function isNumber(value: unknown): value is number {
	return typeof value === 'number' && !isNaN(value);
}

/**
 * Validates URL shortening request payload
 */
export function validateShortenRequest(body: unknown): ValidationResult<{ url: string; suggestedId?: string; hp_field?: string }> {
	if (!body || typeof body !== 'object') {
		return { success: false, error: 'Invalid request body' };
	}

	const payload = body as Record<string, unknown>;

	if (!isNonEmptyString(payload.url)) {
		return { success: false, error: 'URL is required and must be a non-empty string' };
	}

	if (payload.suggestedId !== undefined && !isString(payload.suggestedId)) {
		return { success: false, error: 'suggestedId must be a string' };
	}

	if (payload.hp_field !== undefined && !isString(payload.hp_field)) {
		return { success: false, error: 'hp_field must be a string' };
	}

	return {
		success: true,
		data: {
			url: payload.url,
			suggestedId: payload.suggestedId as string | undefined,
			hp_field: payload.hp_field as string | undefined,
		}
	};
}

/**
 * Validates Bazuka business card request payload
 */
export function validateBazukaRequest(body: unknown): ValidationResult<{ nickname: string; job: string; email: string; website: string; suggestedId?: string; hp_field?: string }> {
	if (!body || typeof body !== 'object') {
		return { success: false, error: 'Invalid request body' };
	}

	const payload = body as Record<string, unknown>;

	if (!isNonEmptyString(payload.nickname)) {
		return { success: false, error: 'nickname is required' };
	}

	if (!isNonEmptyString(payload.job)) {
		return { success: false, error: 'job is required' };
	}

	if (!isNonEmptyString(payload.email)) {
		return { success: false, error: 'email is required' };
	}

	if (!isNonEmptyString(payload.website)) {
		return { success: false, error: 'website is required' };
	}

	return {
		success: true,
		data: {
			nickname: payload.nickname,
			job: payload.job,
			email: payload.email,
			website: payload.website,
			suggestedId: payload.suggestedId as string | undefined,
			hp_field: payload.hp_field as string | undefined,
		}
	};
}

/**
 * Validates Anakin resume request payload
 */
export function validateAnakinRequest(body: unknown): ValidationResult<{ name: string; job: string; email: string; website: string; education: string; skills: string; experience: string; suggestedId?: string; hp_field?: string }> {
	if (!body || typeof body !== 'object') {
		return { success: false, error: 'Invalid request body' };
	}

	const payload = body as Record<string, unknown>;

	if (!isNonEmptyString(payload.name)) {
		return { success: false, error: 'name is required' };
	}

	if (!isNonEmptyString(payload.experience)) {
		return { success: false, error: 'experience is required' };
	}

	if (!isNonEmptyString(payload.skills)) {
		return { success: false, error: 'skills is required' };
	}

	// Validate experience length
	if (payload.experience.length > 500) {
		return { success: false, error: 'Experience too dense. Limit 500 characters.' };
	}

	return {
		success: true,
		data: {
			name: payload.name,
			job: payload.job as string || '',
			email: payload.email as string || '',
			website: payload.website as string || '',
			education: payload.education as string || '',
			skills: payload.skills,
			experience: payload.experience,
			suggestedId: payload.suggestedId as string | undefined,
			hp_field: payload.hp_field as string | undefined,
		}
	};
}

/**
 * Validates Musashi job intel request payload
 */
export function validateMusashiRequest(body: unknown): ValidationResult<{ description: string; hp_field?: string }> {
	if (!body || typeof body !== 'object') {
		return { success: false, error: 'Invalid request body' };
	}

	const payload = body as Record<string, unknown>;

	if (!isNonEmptyString(payload.description)) {
		return { success: false, error: 'description is required' };
	}

	if (payload.description.length < 50) {
		return { success: false, error: 'Intel too shallow. Minimum 50 characters.' };
	}

	if (payload.description.length > 1000) {
		return { success: false, error: 'Intel too dense. Limit 1000 characters.' };
	}

	return {
		success: true,
		data: {
			description: payload.description,
			hp_field: payload.hp_field as string | undefined,
		}
	};
}

/**
 * Validates Yaiba publish request payload
 */
export function validateYaibaRequest(body: unknown): ValidationResult<{ content: string }> {
	if (!body || typeof body !== 'object') {
		return { success: false, error: 'Invalid request body' };
	}

	const payload = body as Record<string, unknown>;

	if (!isNonEmptyString(payload.content)) {
		return { success: false, error: 'content is required' };
	}

	if (payload.content.length < 100) {
		return { success: false, error: 'YAIBA requires at least 100 characters.' };
	}

	if (payload.content.length > 5000) {
		return { success: false, error: 'Invalid content size.' };
	}

	return {
		success: true,
		data: {
			content: payload.content,
		}
	};
}

/**
 * Validates Ragnar slide forge request payload
 */
export function validateRagnarRequest(body: unknown): ValidationResult<{ title: string; audience: string; details: string; hp_field?: string }> {
	if (!body || typeof body !== 'object') {
		return { success: false, error: 'Invalid request body' };
	}

	const payload = body as Record<string, unknown>;

	if (!isNonEmptyString(payload.title)) {
		return { success: false, error: 'Title is required to summon Ragnar.' };
	}

	if (!isNonEmptyString(payload.details)) {
		return { success: false, error: 'Details are required to summon Ragnar.' };
	}

	return {
		success: true,
		data: {
			title: payload.title,
			audience: payload.audience as string || '',
			details: payload.details,
			hp_field: payload.hp_field as string | undefined,
		}
	};
}

/**
 * Validates Odin analyze request payload
 */
export function validateOdinRequest(body: unknown): ValidationResult<{ columns: string[]; numRows: number; sample: Record<string, unknown>[]; turnstileToken: string }> {
	if (!body || typeof body !== 'object') {
		return { success: false, error: 'Invalid request body' };
	}

	const payload = body as Record<string, unknown>;

	if (!Array.isArray(payload.columns)) {
		return { success: false, error: 'columns must be an array' };
	}

	if (!isNumber(payload.numRows)) {
		return { success: false, error: 'numRows must be a number' };
	}

	if (!Array.isArray(payload.sample)) {
		return { success: false, error: 'sample must be an array' };
	}

	if (!isNonEmptyString(payload.turnstileToken)) {
		return { success: false, error: 'Security handshake required.' };
	}

	return {
		success: true,
		data: {
			columns: payload.columns as string[],
			numRows: payload.numRows,
			sample: payload.sample as Record<string, unknown>[],
			turnstileToken: payload.turnstileToken,
		}
	};
}
