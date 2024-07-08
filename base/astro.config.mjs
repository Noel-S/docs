import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			editLink: {
				baseUrl: 'http://localhost:3000/edit/'
			},
		}),
	],
	outDir: '../dist',
});
