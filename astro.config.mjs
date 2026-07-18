import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://mohammadrezailmakchi.github.io",
  base: "/mohammadrezailmakchi/",

  vite: {
    plugins: [tailwindcss()],
  },
});