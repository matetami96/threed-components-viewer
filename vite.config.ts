import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const isProduction = mode === "production";

	return {
		base: isProduction ? "/react-model-viewer/" : "/",
		plugins: [react()],
		build: {
			rollupOptions: {
				output: {
					entryFileNames: "react-model-viewer.js",
					assetFileNames: (assetInfo) => {
						if (assetInfo.names && assetInfo.names.some((name) => name.endsWith(".css"))) {
							return "react-model-viewer.css";
						}
						return "assets/[name].[hash][extname]";
					},
				},
			},
		},
	};
});
