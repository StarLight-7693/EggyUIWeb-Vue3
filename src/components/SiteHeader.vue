<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import logo from '@/assets/images/logo.png'

// 原站 header.js 行为（TS 化）：汉堡开合 / ESC / 点外关闭 / 滚动 .scrolled / 加载进度条 / 按钮特效
const navOpen = ref(false)
const scrolled = ref(false)
const progressActive = ref(false)
const progressDone = ref(false)
const progressWidth = ref(0)
const btnPop = ref(false)

const route = useRoute()

function setScrollLock(lock: boolean) {
  document.body.style.overflow = lock ? 'hidden' : ''
}

function closeMenu() {
  navOpen.value = false
  setScrollLock(false)
}

function toggleMenu() {
  navOpen.value = !navOpen.value
  setScrollLock(navOpen.value)
}

function startPop() {
  btnPop.value = false
  requestAnimationFrame(() => {
    btnPop.value = true
    window.setTimeout(() => (btnPop.value = false), 350)
  })
}

let progressTimer: number | undefined

function simulateLoading() {
  if (progressTimer) window.clearInterval(progressTimer)
  progressWidth.value = 0
  progressActive.value = true
  progressDone.value = false
  let p = 0
  progressTimer = window.setInterval(() => {
    p += 2
    if (p >= 100) {
      p = 100
      window.clearInterval(progressTimer)
      progressTimer = undefined
      finishProgress()
      return
    }
    progressWidth.value = p
  }, 50)
}

function finishProgress() {
  progressWidth.value = 100
  progressDone.value = true
  window.setTimeout(() => {
    progressActive.value = false
    progressDone.value = false
    progressWidth.value = 0
  }, 800)
}

function onScroll() {
  scrolled.value = window.scrollY > 20
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && navOpen.value) {
    closeMenu()
    const btn = document.querySelector<HTMLButtonElement>('.hamburger')
    btn?.focus()
  }
}

function onDocClick(e: MouseEvent) {
  const header = document.querySelector<HTMLElement>('.glass-header')
  if (navOpen.value && header && !header.contains(e.target as Node)) closeMenu()
}

// 路由切换时关闭抽屉（替代原站整页跳转的收起逻辑）
watch(
  () => route.fullPath,
  () => closeMenu(),
)

onMounted(() => {
  simulateLoading()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('keydown', onKeydown)
  document.addEventListener('click', onDocClick)
  onScroll()
})

onBeforeUnmount(() => {
  if (progressTimer) window.clearInterval(progressTimer)
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('click', onDocClick)
  setScrollLock(false)
})
</script>

<template>
  <header class="glass-header" :class="{ scrolled }" role="banner">
    <!-- 顶部加载进度条 -->
    <div
      class="loading-bar"
      :class="{ active: progressActive, done: progressDone }"
      :style="{ width: progressWidth + '%' }"
    ></div>

    <!-- Logo -->
    <RouterLink to="/" class="brand" aria-label="首页">
      <span class="logo-icon">
        <img :src="logo" alt="Logo" />
      </span>
      <span class="brand-text">EggyUI</span>
    </RouterLink>

    <!-- 导航 -->
    <ul class="nav-links" :class="{ open: navOpen }" role="navigation">
      <li><RouterLink to="/">首页</RouterLink></li>
      <li><RouterLink to="/download">下载</RouterLink></li>
      <li><RouterLink to="/about">关于</RouterLink></li>
    </ul>

    <!-- 右侧操作 -->
    <div class="actions">
      <RouterLink
        to="/download"
        class="btn btn-primary"
        :class="{ 'btn-click': btnPop }"
        @click="startPop"
      >
        开始使用
      </RouterLink>

      <!-- 汉堡菜单 -->
      <button
        class="hamburger"
        :class="{ active: navOpen }"
        aria-label="切换导航菜单"
        :aria-expanded="navOpen"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

/* ===== 毛玻璃 Header ===== */
.glass-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  @include glass($hdr-bg, 20px);

  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: background 0.35s ease, box-shadow 0.35s ease;
  padding: 0 2rem;
  height: $header-h;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
}

.glass-header.scrolled {
  background: $hdr-bg-scrolled;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.08);
  border-bottom-color: rgba(0, 0, 0, 0.08);
}

/* 顶部加载进度条 */
.loading-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: $hdr-load-grad;
  background-size: 200% 100%;
  z-index: 1001;
  border-radius: 0 0 2px 2px;
  box-shadow: 0 0 12px rgba(79, 70, 229, 0.3);
  transition: width 0.3s ease, opacity 0.6s ease;
  opacity: 0;
  pointer-events: none;

  &.active {
    opacity: 1;
  }
  &.done {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
}

/* Logo */
.brand {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
  flex-shrink: 0;
  color: $hdr-text;

  .logo-icon {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    overflow: hidden;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 12px;
    }
  }

  .brand-text {
    color: $hdr-text;
    -webkit-text-fill-color: $hdr-text;
  }
}

/* 导航（桌面） */
.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  margin: 0;

  li a {
    display: block;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    color: $hdr-muted;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 450;

    // 当前路由高亮（RouterLink）
    &.router-link-exact-active {
      color: $hdr-text;
      background: rgba(0, 0, 0, 0.08);
    }
  }
}

/* 右侧操作 */
.actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1.2rem;
  border-radius: 40px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  background: rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  color: $hdr-text;
}

.btn-primary {
  background: $hdr-btn-grad;
  border-color: transparent;
  color: #fff;
  box-shadow: 0 4px 16px rgba(79, 70, 229, 0.25);
}

.btn-primary.btn-click {
  animation: btnPop 0.35s ease;
}

@keyframes btnPop {
  0% {
    transform: scale(1);
  }
  35% {
    transform: scale(0.92);
  }
  65% {
    transform: scale(1.06);
  }
  100% {
    transform: scale(1);
  }
}

/* 汉堡按钮 */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 4px;
  border-radius: 8px;

  span {
    display: block;
    width: 24px;
    height: 2px;
    background: $hdr-muted;
    border-radius: 4px;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  &.active {
    span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }
    span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
  }
}

/* ===== 平板及以下（820px）===== */
@include respond-below($bp-md) {
  .glass-header {
    padding: 0 1.25rem;
    height: $header-h-md;
  }

  /* 导航折叠为抽屉 */
  .nav-links {
    position: absolute;
    top: $header-h-md;
    left: 0;
    right: 0;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(28px) saturate(1.6);
    -webkit-backdrop-filter: blur(28px) saturate(1.6);
    padding: 1.25rem 1.5rem 1.75rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 0 0 24px 24px;
    gap: 0.2rem;
    transform: scaleY(0);
    transform-origin: top center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.08);
    pointer-events: none;

    &.open {
      transform: scaleY(1);
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    li a {
      padding: 0.6rem 1rem;
      font-size: 1rem;
      width: 100%;
      border-radius: 12px;
    }
  }

  .hamburger {
    display: flex;
  }

  .btn-primary {
    padding: 0.4rem 1rem;
    font-size: 0.85rem;
  }
}

/* ===== 手机（500px）===== */
@include respond-below($bp-3xs) {
  .glass-header {
    padding: 0 1rem;
    height: $header-h-xs;
  }

  .actions .btn-primary {
    padding: 0.35rem 0.8rem;
    font-size: 0.75rem;
  }

  .brand .brand-text {
    font-size: 1rem;
  }
}
</style>
