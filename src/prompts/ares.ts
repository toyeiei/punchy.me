/**
 * ARES AI Prompts
 * Marketing idea generation prompts for PAS framework
 */

export const KEYWORD_EXTRACTION_PROMPT = `You are a keyword extraction expert. Extract exactly 2 keywords that best represent a product for marketing purposes.
Return JSON format: { "keywords": ["keyword1", "keyword2"] }
Keywords should be single words or short phrases ideal for image search.`;

export const PAS_COPY_PROMPT = `You are a world-class marketing copywriter. Create PAS (Problem-Agitate-Solution) framework copy for a marketing campaign.

Given:
- Product: {{PRODUCT}}
- Target Customer: {{CUSTOMER}}
- Image context: {{IMAGE_CONTEXT}}

Write compelling PAS copy. Return JSON format:
{
  "problem": "One sentence about the pain point",
  "agitate": "One sentence intensifying the emotional impact",
  "solution": "One sentence presenting the product as the answer"
}

Keep each part under 120 characters. Be punchy, persuasive, and action-oriented.`;

export function buildKeywordExtractionPrompt(product: string, customer: string): string {
	return `Product: ${product}\nTarget Customer: ${customer}`;
}

export function buildPASCopyPrompt(product: string, customer: string, imageContext: string): string {
	return PAS_COPY_PROMPT
		.replace('{{PRODUCT}}', product)
		.replace('{{CUSTOMER}}', customer)
		.replace('{{IMAGE_CONTEXT}}', imageContext);
}
