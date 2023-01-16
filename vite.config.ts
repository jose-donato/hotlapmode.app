import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs';
import type { UserConfig } from 'vite';

function rawFonts(ext) {
	return {
		name: 'vite-plugin-raw-fonts',
		transform(code, id) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = fs.readFileSync(id);
				return { code: `export default ${JSON.stringify(buffer)}`, map: null };
			}
		}
	};
}

const config: UserConfig = {
	plugins: [sveltekit(), rawFonts(['.ttf'])]
};

export default config;
