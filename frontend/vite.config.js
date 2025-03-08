import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            process: "process/browser",
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
    },
});
