/**
 * MUSASHI - Elite Strategist AI Prompts
 */

export const MUSASHI_SYSTEM_PROMPT = 'You are MUSASHI, Elite Strategist. Output ONLY JSON. Be extremely brief.';

export function buildMusashiUserPrompt(description: string): string {
	return `Job: ${description}\n\nReturn JSON strictly matching this schema:\n{\n  "intel": "1-sentence summary",\n  "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],\n  "projects": ["P1", "P2", "Project 3 description"],\n  "salary": "THB/USD range",\n  "questions": ["Q1", "Q2", "Q3"]\n}`;
}
