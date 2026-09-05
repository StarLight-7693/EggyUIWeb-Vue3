<script setup lang="ts">
import { ref } from 'vue'
import { downloadMeta } from '@/data'
import DownloadVersionItem from '@/components/DownloadVersionItem.vue'

// 数据来自构建期打包的本地模块（downloadMeta），运行时不发起任何网络请求。
const title = downloadMeta.title || '未命名软件'
const badge = downloadMeta.version ? `v${downloadMeta.version}` : ''
const overallDesc = downloadMeta.description || ''
const versions = downloadMeta.versions && downloadMeta.versions.length ? downloadMeta.versions : null

const activeIndex = ref(-1) // -1 表示无展开项
const statusText = ref('就绪')

function handleToggle(index: number) {
  if (activeIndex.value === index) {
    activeIndex.value = -1
    statusText.value = '请选择一个版本'
    return
  }
  activeIndex.value = index
  const v = versions?.[index]
  statusText.value = v ? `已选: ${v.type || '版本'}` : ''
}
</script>

<template>
  <div class="dl-page">
    <!-- 背景 -->
    <div class="bg-layer"></div>
    <div class="glow glow-1"></div>
    <div class="glow glow-2"></div>

    <div class="app-wrapper">
      <div class="dl-content">
        <!-- 标题 -->
        <div class="header">
          <h1>{{ title }}</h1>
          <div v-if="badge" class="version-badge">{{ badge }}</div>
        </div>
        <p class="overall-desc">{{ overallDesc }}</p>

        <!-- 手风琴 -->
        <div v-if="versions" class="accordion">
          <DownloadVersionItem
            v-for="(v, i) in versions"
            :key="v.id || i"
            :version="v"
            :expanded="activeIndex === i"
            @toggle="handleToggle(i)"
          />
        </div>
        <p v-else class="empty-tip">暂无版本信息</p>

        <!-- 本地状态 -->
        <div class="status-bar">
          <span class="dot"></span>
          <span>{{ statusText }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

/* 页面层 */
.dl-page {
  position: relative;
  min-height: 100dvh;
  background: $dl-bg;
  overflow: hidden;
}

/* 背景装饰层 */
.bg-layer {
  position: fixed;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(ellipse 70% 50% at 20% 20%, rgba(37, 99, 235, 0.05) 0%, transparent 70%),
    radial-gradient(ellipse 50% 40% at 80% 80%, rgba(99, 102, 241, 0.04) 0%, transparent 60%),
    $dl-bg;
}

.glow {
  position: fixed;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.15;
  pointer-events: none;
  z-index: 0;

  &.glow-1 {
    width: 500px;
    height: 500px;
    top: -150px;
    right: -80px;
    background: $dl-blue;
  }
  &.glow-2 {
    width: 350px;
    height: 350px;
    bottom: -80px;
    left: -60px;
    background: $dl-indigo;
  }
}

/* 主容器（预留顶部固定 Header 高度） */
.app-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: calc(#{$header-h} + 32px) 24px 48px;
}

/* 内容淡入 */
.dl-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: dlRise 0.6s ease both;
}

@keyframes dlRise {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 标题 */
.header {
  margin-bottom: 8px;

  h1 {
    font-size: clamp(34px, 5vw, 48px);
    font-weight: 700;
    color: $dl-ink;
    letter-spacing: -0.02em;
    line-height: 1.15;
  }

  .version-badge {
    display: inline-block;
    margin-top: 4px;
    font-size: 14px;
    font-weight: 500;
    color: $dl-muted;
    background: $dl-soft;
    padding: 3px 16px;
    border-radius: 30px;
    border: 1px solid $dl-border;
  }
}

.overall-desc {
  max-width: 600px;
  font-size: clamp(15px, 1.1vw, 18px);
  line-height: 1.7;
  color: $dl-muted;
  margin: 8px 0 32px;
  font-weight: 400;
}

/* 手风琴容器 */
.accordion {
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 8px;
}

.empty-tip {
  color: $dl-faint;
  font-size: 15px;
  padding: 20px 0;
}

/* 状态栏 */
.status-bar {
  margin-top: 24px;
  font-size: 14px;
  color: $dl-faint;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 28px;
  transition: all 0.3s ease;

  .dot {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #cbd5e1;
    flex-shrink: 0;
    transition: background 0.3s;
  }
}

/* ===== 响应式 ===== */
@include respond-below($bp-xs) {
  .app-wrapper {
    padding: calc(#{$header-h-md} + 16px) 14px 32px;
  }
  .header h1 {
    font-size: 28px;
  }
  .overall-desc {
    font-size: 14px;
    margin-bottom: 24px;
  }
}

@include respond-below($bp-4xs) {
  .app-wrapper {
    padding: calc(#{$header-h-xs} + 12px) 10px 24px;
  }
  .header h1 {
    font-size: 24px;
  }
}
</style>
