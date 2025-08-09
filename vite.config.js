// vite.config.js
import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";

const repoName = process.env.GH_PAGES_REPO || ""; // set when needed
export default defineConfig({
  plugins: [react()],
  base: repoName ? `/${repoName}/` : '/',
});
