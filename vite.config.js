import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Fully static output — GitHub Pages only serves files, no SSR at runtime.
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: undefined,
				precompress: false,
				strict: true
			}),

			// A single bad value in the content sheet (e.g. a broken image path)
			// must not be able to fail the ENTIRE build and block every other
			// page's updates from deploying — warn and keep going instead.
			prerender: {
				handleHttpError: 'warn'
			}
		})
	]
});
