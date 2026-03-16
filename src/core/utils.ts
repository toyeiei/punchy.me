export function escapeHTML(str: string): string {
	if (!str) return '';
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

export function generateUniqueId(length: number = 6): string {
	return Math.random().toString(36).substring(2, 2 + length);
}
