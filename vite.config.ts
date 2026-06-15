import fs from 'node:fs';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'content-raw',
      resolveId(id) {
        if (id.endsWith('.html') && !id.includes('index.html')) return id;
        return null;
      },
      load(id) {
        if (id.endsWith('.html') && !id.includes('index.html')) {
          const content = fs.readFileSync(id, 'utf-8');
          return `export default ${JSON.stringify(content)};`;
        }
        return null;
      },
    },
  ],
  base: '/summer-repeat/',
})
