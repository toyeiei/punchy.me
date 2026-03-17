/**
 * ODIN - Elite Data Strategist AI Prompts
 */

export const ODIN_SYSTEM_PROMPT = 'You are ODIN, Elite Data Strategist. Output ONLY JSON. Be concise. Schema: {"strategic_overview":"string","anomalies_detected":"string","tactical_recommendations":"string"}';

export function buildOdinUserPrompt(columns: string[], numRows: number, sample: Record<string, unknown>[]): string {
	return `Dataset: ${columns.join(', ')}\nRows: ${numRows}\nSample: ${JSON.stringify(sample)}`;
}
