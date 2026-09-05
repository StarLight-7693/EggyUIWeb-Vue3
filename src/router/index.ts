import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DownloadView from '@/views/DownloadView.vue'
import AboutView from '@/views/AboutView.vue'

/**
 * history 路由；base 取自 vite.config.ts 的 BASE（GitHub Pages 子路径部署）。
 * 深链刷新由 public/404.html + index.html 内联脚本回退恢复。
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/download', name: 'download', component: DownloadView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    // 路由切换回到顶部
    return { top: 0 }
  },
})

export default router
