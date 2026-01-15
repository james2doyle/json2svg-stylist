import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
	base: process.env.NODE_ENV === "production" ? "/json2svg-stylist/" : "./",
	build: {
		outDir: "docs",
		chunkSizeWarningLimit: 1024, // kB
	},
	plugins:
		process.env.NODE_ENV === "production"
			? [vue(), tailwindcss()]
			: [vue(), vueDevTools(), tailwindcss()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
