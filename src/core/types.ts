export interface BazukaData {
	type?: 'bazuka';
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

export interface RagnarSlide {
	header: string;
	content: string;
	type?: 'list' | 'quote' | 'bigtext' | 'comparison' | 'opening' | 'points' | 'challenge' | 'solution' | 'action' | 'closing';
}

export interface RagnarData {
	type: 'ragnar';
	title: string;
	audience: string;
	slides: RagnarSlide[];
}

export interface BrowserRenderingResponse {
	result: {
		markdown: string;
	};
	success: boolean;
	errors: string[];
	messages: string[];
}

export interface ThorMetadata {
	id: string;
	url: string;
	title: string;
	description: string;
	word_count: number;
	last_scraped: string;
	status: 'pending' | 'processing' | 'completed' | 'error';
}

export interface Env {
	SHORT_LINKS: KVNamespace;
	AI: Ai;
	THOR_STORAGE: D1Database;
	THOR_MEMORY: VectorizeIndex;
	BROWSER: any; // Puppeteer/Browser binding
	THOR_API_TOKEN?: string;
	CLOUDFLARE_ACCOUNT_ID?: string;
	TURNSTILE_SITE_KEY: string;
	TURNSTILE_SECRET_KEY: string;
	UNSPLASH_ACCESS_KEY: string;
}
