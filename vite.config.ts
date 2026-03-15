import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import fs from 'fs';

function getHtmlFiles(dir, fileList = {}) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist') {
        getHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      const name = path.relative(__dirname, filePath).replace(/\.html$/, '').replace(/\\/g, '/');
      fileList[name] = filePath;
    }
  }
  return fileList;
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        input: getHtmlFiles(__dirname)
      }
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
