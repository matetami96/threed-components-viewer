import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			output: {
				entryFileNames: "model-viewer.js",
				assetFileNames: (assetInfo) => {
					if (assetInfo.name && assetInfo.name.endsWith(".css")) {
						return "model-viewer.css";
					}
					// Default asset naming for other assets
					return "assets/[name].[hash][extname]";
				},
			},
		},
	},
});
