// // vite.config.jsx

// import path from "path";
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { fileURLToPath } from "url";

// // Define __filename and __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: [
//       '@radix-ui/react-select',
//       '@radix-ui/react-label',
//       'react-dom/client',
//       'react-redux',
//     ],
//   },
//   resolve: {
//     alias: {
//       // '@radix-ui/react-select': '@radix-ui/react-select',
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });



// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for 'src' directory
    },
  },
});
