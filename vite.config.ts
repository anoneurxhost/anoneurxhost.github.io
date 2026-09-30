import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: process.env.VITE_BASE_URL || "/",
  server: {
    host: "::",
    // Agent owns 127.0.0.1:8080 and the gateway owns 127.0.0.1:8081;
    // Vite must stay on its own port (5173) so it doesn't collide.
    port: 5173,
    watch: {
      usePolling: true,
      ignored: ["**/node_modules/**", "**/.git/**", "**/dist/**"],
    },
  },
  define: {
    'process.env': {}
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
