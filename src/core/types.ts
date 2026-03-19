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

export interface PollData {
	type: 'poll';
	question: string;
	options: string[];
	votes: number[];
	createdAt: number;
}

export interface AresResult {
	type: 'ares';
	product: string;
	customer: string;
	keywords: string[];
	panels: {
		imageUrl: string;
		thumbUrl: string;
		imageColor: string;
		copy: {
			problem: string;
			agitate: string;
			solution: string;
		};
		colors: string[];
	}[];
	createdAt: number;
}

export interface MarcusSession {
	type: 'marcus';
	template: string;
	dataSummary: string;
	analysisResult: string;
	plots: string[];
	aiExplanation: string;
	createdAt: number;
}

export interface LifeEvent {
	age: number;
	amount: number;
	label: string;
}

export interface ZeusSimulation {
	type: 'zeus';
	inputs: {
		age: number;
		income: number;
		savingsRate: number;
		currentSavings: number;
		returnRate: number;
		inflationRate: number;
		retirementTarget: number;
		salaryGrowth: number;
		crisisEvents: number;
		monthlyExpenses: number;
		healthcareBase: number;
		healthcareGrowth: number;
		lifeEvents: LifeEvent[];
	};
	results: {
		iterations: number[][];
		medianPath: number[];
		medianFinal: number;
		p10: number;
		p90: number;
		successProbability: number;
		medianYearsToFire: number;
		ruinProbability: number;
		successProbabilityNoCrisis?: number;
		crisisYears?: number[];
	};
	createdAt: number;
}

export interface ZinsserSubscriber {
	type: 'zinsser:sub';
	email: string;
	status: 'pending' | 'active' | 'unsubscribed';
	token: string;
	subscribedAt: number;
	confirmedAt?: number;
}

export interface ZinsserPost {
	type: 'zinsser:post';
	id: string;
	title: string;
	content: string;
	publishedAt: number;
}

export interface Env {
	SHORT_LINKS: KVNamespace;
	AI: Ai;
	BROWSER: {
		connect: (sessionId: string) => Promise<unknown>;
		disconnect: (sessionId: string) => Promise<void>;
		[key: string]: unknown;
	};
	THOR_API_TOKEN?: string;
	CLOUDFLARE_ACCOUNT_ID?: string;
	RESEND_API_KEY?: string;
	ZINSSER_ADMIN_KEY?: string;
	TURNSTILE_SITE_KEY: string;
	TURNSTILE_SECRET_KEY: string;
	UNSPLASH_ACCESS_KEY: string;
	STRIPE_SECRET_KEY?: string;
	STRIPE_WEBHOOK_SECRET?: string;
}

// Stripe Types
export interface StripeCustomer {
	id: string;
	email: string;
	createdAt: number;
	subscription?: StripeSubscription;
	purchases: Record<string, number>; // tool -> purchasedAt
}

export interface StripeSubscription {
	id: string;
	status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete';
	currentPeriodStart: number;
	currentPeriodEnd: number;
	cancelAtPeriodEnd: boolean;
}

export interface StripeCheckoutSession {
	id: string;
	url: string;
}

export const PREMIUM_TOOLS = ['thor', 'marcus', 'zeus'] as const;
export type PremiumTool = typeof PREMIUM_TOOLS[number];
