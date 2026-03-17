import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleAresGet, generateColorPalette } from './ares';

// Mock fetch for Unsplash API
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('ARES Handler', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		
		// Default Unsplash mock response
		mockFetch.mockResolvedValue({
			ok: true,
			json: () => Promise.resolve({
				results: [
					{
						id: 'abc123',
						urls: { raw: 'https://images.unsplash.com/abc', regular: 'https://images.unsplash.com/abc' },
						color: '#22c55e',
						alt_description: 'Marketing image',
					},
					{
						id: 'def456',
						urls: { raw: 'https://images.unsplash.com/def', regular: 'https://images.unsplash.com/def' },
						color: '#3b82f6',
						alt_description: 'Business image',
					},
					{
						id: 'ghi789',
						urls: { raw: 'https://images.unsplash.com/ghi', regular: 'https://images.unsplash.com/ghi' },
						color: '#ef4444',
						alt_description: 'Growth image',
					},
				],
			}),
		});
	});

	describe('handleAresGet', () => {
		it('should return HTML page', async () => {
			const response = await handleAresGet();
			expect(response.status).toBe(200);
			expect(response.headers.get('Content-Type')).toBe('text/html');
			const html = await response.text();
			expect(html).toContain('ARES');
		});
	});

	describe('generateColorPalette', () => {
		it('should generate 5 colors from base color', () => {
			const palette = generateColorPalette('#22c55e');
			expect(palette.length).toBe(5);
			expect(palette[0]).toBe('#22c55e');
		});

		it('should generate lighter color', () => {
			const palette = generateColorPalette('#808080');
			// Lighter version should have higher RGB values
			expect(palette[1]).not.toBe(palette[0]);
		});

		it('should generate darker color', () => {
			const palette = generateColorPalette('#808080');
			// Darker version should have lower RGB values
			expect(palette[2]).not.toBe(palette[0]);
		});

		it('should generate complementary color', () => {
			const palette = generateColorPalette('#ff0000');
			// Complementary of red is cyan
			expect(palette[3]).toBe('#00ffff');
		});

		it('should generate muted color', () => {
			const palette = generateColorPalette('#ff0000');
			// Muted color should be desaturated
			expect(palette[4]).toBeDefined();
		});

		it('should handle black color', () => {
			const palette = generateColorPalette('#000000');
			expect(palette.length).toBe(5);
			expect(palette[0]).toBe('#000000');
		});

		it('should handle white color', () => {
			const palette = generateColorPalette('#ffffff');
			expect(palette.length).toBe(5);
			expect(palette[0]).toBe('#ffffff');
		});

		it('should handle hex without hash', () => {
			const palette = generateColorPalette('22c55e');
			expect(palette.length).toBe(5);
			expect(palette[0]).toBe('22c55e');
		});
	});
});
