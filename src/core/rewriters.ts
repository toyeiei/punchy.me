import { BazukaData, AnakinData } from './types';
import { escapeHTML } from './utils';

export class BazukaHandler {
	private data: BazukaData;
	constructor(data: BazukaData) { this.data = data; }
	element(element: Element) {
		const id = element.getAttribute('id');
		if (id === 'card-nickname') {
			element.setInnerContent(this.data.nickname);
			element.setAttribute('data-text', this.data.nickname);
		}
		if (id === 'card-job') element.setInnerContent(this.data.job);
		if (id === 'card-email') element.setInnerContent(this.data.email);
		if (id === 'card-website') element.setInnerContent(escapeHTML(this.data.website));

		if (id === 'card-email-link') element.setAttribute('href', `mailto:${this.data.email}`);
		if (id === 'card-website-link') element.setAttribute('href', escapeHTML(this.data.website));

		if (id === 'title-tag') element.setInnerContent(`${this.data.nickname} | Digital Business Card | PUNCHY.ME`);
		if (id === 'og-title' || id === 'twitter-title') {
			element.setAttribute('content', escapeHTML(`${this.data.nickname} | Digital Business Card | PUNCHY.ME`));
		}
		if (id === 'og-description' || id === 'twitter-description') {
			element.setAttribute('content', escapeHTML(`Contact: ${this.data.email} | View my high-impact digital business card on BAZUKA.`));
		}
	}
}

export class AnakinHandler {
	private data: AnakinData;
	constructor(data: AnakinData) { this.data = data; }
	element(element: Element) {
		const id = element.getAttribute('id');
		if (id === 'res-name') element.setInnerContent(this.data.name);
		if (id === 'res-job') element.setInnerContent(this.data.job);
		if (id === 'res-email') element.setInnerContent(this.data.email);
		if (id === 'res-website') element.setInnerContent(escapeHTML(this.data.website));

		if (id === 'res-email-link') element.setAttribute('href', `mailto:${this.data.email}`);
		if (id === 'res-website-link') element.setAttribute('href', escapeHTML(this.data.website));
		if (id === 'res-summary') {
			if (this.data.aiSummary) {
				element.setInnerContent(this.data.aiSummary);
				element.removeAttribute('data-pending');
			} else {
				element.setInnerContent('Refining professional profile...');
				element.setAttribute('data-pending', 'true');
			}
		}
		if (id === 'res-experience') {
			if (this.data.aiExperience) {
				element.setInnerContent(this.data.aiExperience);
				element.removeAttribute('data-pending');
			} else {
				element.setInnerContent(this.data.experience);
				element.setAttribute('data-pending', 'true');
			}
		}
		if (id === 'res-education') element.setInnerContent(this.data.education);
		if (id === 'res-skills') {
			const tags = this.data.skills.split(',').map((s: string) => `<span class="expertise-tag">${escapeHTML(s.trim())}</span>`).join('');
			element.setInnerContent(tags, { html: true });
		}

		if (id === 'title-tag') element.setInnerContent(`${this.data.name} | Professional Resume | PUNCHY.ME`);
		if (id === 'og-title' || id === 'twitter-title') {
			element.setAttribute('content', escapeHTML(`${this.data.name} | Professional Resume | PUNCHY.ME`));
		}
		if (id === 'og-description' || id === 'twitter-description') {
			const desc = this.data.aiSummary || `View the professional resume of ${this.data.name} (${this.data.job}). Refined by Anakin AI.`;
			element.setAttribute('content', escapeHTML(desc));
		}
	}
}
