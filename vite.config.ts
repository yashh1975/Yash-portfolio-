import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig(({ command }) => ({
  plugins: [
    tanstackStart({
      server: { entry: "server" },
      prerender: {
        enabled: true,
      },
      pages: [{ path: "/" }],
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    react(),
  ],
  resolve: {
    alias: {
      "@": `${process.cwd()}/src`,
    },
  },
}));

