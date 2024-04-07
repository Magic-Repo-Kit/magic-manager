import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import legacy from "@vitejs/plugin-legacy";
import path from 'path';

export default defineConfig({
  // base: './', //vite默认根目录"/"
  plugins: [
    react(),
    // legacy({
    //   targets: ["defaults", "not IE 11"],
    // }),
  ],
  // build: {
  //   minify: "terser", // 必须开启：使用terserOptions才有效果
  //   terserOptions: {
  //     compress: {
  //       //生产环境时移除console
  //       drop_console: true,
  //       drop_debugger: true,
  //     },
  //   },
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api': {
        // target: 'http://124.222.46.195:1000',
        target: 'http://60.204.200.62:1000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

