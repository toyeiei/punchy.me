export interface BazukaData {
	type?: string;
	nickname: string;
	job: string;
	email: string;
	website: string;
}

export interface AnakinData {
	type: 'anakin';
	name: string;
	job: string;
	email: string;
	website: string;
	education: string;
	skills: string;
	experience: string;
	aiSummary?: string;
	aiExperience?: string;
	aiHydrated?: boolean;
}

export interface YaibaData {
	type: 'yaiba';
	content: string;
	tags: string[];
	createdAt: number;
}

export interface Env {
	SHORT_LINKS: KVNamespace;
	AI: Ai;
	TURNSTILE_SITE_KEY: string;
	UNSPLASH_ACCESS_KEY: string;
	RESEND_API_KEY?: string;
}
