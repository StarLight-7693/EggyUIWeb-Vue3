import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/index.scss'
import favicon from '@/assets/images/favicon.png'

// 动态设置站点图标（走打包资源，自动适配 GitHub Pages base）
const iconLink = document.createElement('link')
iconLink.rel = 'icon'
iconLink.type = 'image/png'
iconLink.href = favicon
document.head.appendChild(iconLink)

createApp(App).use(router).mount('#app')
