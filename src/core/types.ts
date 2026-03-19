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

// MARCUS - Stoic Wisdom Blog
export interface MarcusPost {
	type: 'marcus:post';
	id: string;
	slug: string;
	title: string;
	body: string;
	excerpt: string;
	coverImage: string | null;
	tags: string[];
	createdAt: number;
	publishedAt: number;
}

// Midgard - Private Editor
export interface MidgardSession {
	type: 'midgard:session';
	lastSaved: number;
	draft: Partial<MarcusPost>;
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
	result: string; // Markdown content directly
	success: boolean;
	errors: string[];
	messages: string[];
}

export interface ThorIntelligence {
	seo: {
		ogTitle: string | null;
		ogDescription: string | null;
		ogImage: string | null;
		metaTitle: string | null;
		metaDescription: string | null;
		metaKeywords: string[];
		canonical: string | null;
		robots: string | null;
	};
	structure: {
		h1Count: number;
		h2Count: number;
		h3Count: number;
		h1Texts: string[];
		linkCount: number;
		imageCount: number;
		notableImages: { src: string; alt: string }[];
	};
	content: {
		summary: string;
		topics: string[];
		contentType: string;
		targetAudience: string;
		keyEntities: string[];
		readingTime: number;
		wordCount: number;
	};
	technical: {
		hasSchema: boolean;
		schemaTypes: string[];
		ogScore: number;
	};
}

export interface ThorReport {
	id: string;
	url: string;
	title: string;
	scrapedAt: string;
	intelligence: ThorIntelligence;
}

export interface Env {
	SHORT_LINKS: KVNamespace;
	AI: Ai;
	BROWSER: any; // Puppeteer/Browser binding
	THOR_API_TOKEN?: string;
	CLOUDFLARE_ACCOUNT_ID?: string;
	TURNSTILE_SITE_KEY: string;
	TURNSTILE_SECRET_KEY: string;
	UNSPLASH_ACCESS_KEY: string;
	MIDGARD_SECRET?: string; // Access token for /midgard editor
}
