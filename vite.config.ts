import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// ============================================================
// GitHub Pages 部署路径（base）
//   - 项目页仓库（github.com/<user>/<repo>）  → '/<repo>/'
//   - 用户/组织主页（<user>.github.io）        → '/'
// 部署前请把下面常量改为实际仓库名，
// 例如项目仓库 EggyUIWeb-Vue3 → '/EggyUIWeb-Vue3/'
// ============================================================
const BASE = '/EggyUIWeb-Vue3/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: BASE,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
