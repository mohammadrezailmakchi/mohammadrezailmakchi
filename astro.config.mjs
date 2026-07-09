import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Replace with your GitHub username and repo name
  site: 'https://mohammadrezailmakchi.github.io',

  base: '/',

  vite: {
    plugins: [tailwindcss()],
  },
});