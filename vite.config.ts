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
const BASE = '/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: BASE,
  // ------------------------------------------------------------
  // CSS 压缩目标（关键）
  // Vite 8 用 LightningCSS 压缩 CSS：若未设置 cssTarget，压缩器会按「最新浏览器」
  // 处理，把 `max-width` 现代化重写成范围语法 `width<=820px`。
  // 不支持该语法的旧版移动端内核（Chrome/Edge < 104、Safari/iOS < 16.4，常见于
  // 各类 App 内置浏览器）会整块丢弃媒体查询，导致全部响应式规则失效。
  // 下面取值均低于范围语法支持门槛，强制输出传统 max-width 写法。
  // ------------------------------------------------------------
  build: {
    cssTarget: ['chrome103', 'edge103', 'firefox101', 'safari16.3', 'ios16.3'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
