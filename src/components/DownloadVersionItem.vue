<script setup lang="ts">
import { ref } from 'vue'
import type { DownloadVersion } from '@/types/download'

const props = defineProps<{
  version: DownloadVersion
  expanded: boolean
}>()

const emit = defineEmits<{
  toggle: []
}>()

type ImgState = 'placeholder' | 'image' | 'error'

const hasImage = !!props.version.image && props.version.image.trim() !== ''
const imgState = ref<ImgState>(hasImage ? 'placeholder' : 'placeholder')

function onImgLoad(e: Event) {
  imgState.value = 'image'
  void e
}

function onImgError() {
  imgState.value = 'error'
}
</script>

<template>
  <div class="accordion-item" :class="{ active: expanded }">
    <button
      class="accordion-header"
      :aria-expanded="expanded"
      @click="emit('toggle')"
    >
      <span class="header-left">
        <span class="type">{{ version.type || '版本' }}</span>
        <span v-if="version.version" class="ver">{{ version.version }}</span>
        <span v-if="version.fileSize" class="size-tag">{{ version.fileSize }}</span>
      </span>
      <span class="header-right">
        <span class="status-dot"></span>
        <span class="arrow">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </span>
    </button>

    <div class="accordion-body">
      <div class="body-inner">
        <!-- 配图 / 占位 / 失败态 -->
        <div class="body-image">
          <img
            v-if="hasImage && imgState !== 'error'"
            :src="version.image"
            :alt="(version.type || '版本') + ' 配图'"
            :style="{ display: imgState === 'image' ? 'block' : 'none' }"
            @load="onImgLoad"
            @error="onImgError"
          />
          <div v-if="imgState === 'placeholder'" class="placeholder-img">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>{{ hasImage ? '加载中...' : '暂无配图' }}</span>
          </div>
          <div v-if="imgState === 'error'" class="error-img">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>图片加载失败</span>
          </div>
        </div>

        <!-- 描述 -->
        <p class="body-desc">{{ version.description || '暂无描述' }}</p>

        <!-- 元信息 -->
        <div class="body-meta">
          <span class="meta-item">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
            </svg>
            <span class="label">大小</span>
            <span class="value">{{ version.fileSize || '--' }}</span>
          </span>
          <span class="meta-item">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <circle cx="12" cy="15" r="1" />
            </svg>
            <span class="label">更新</span>
            <span class="value">{{ version.updateDate || '--' }}</span>
          </span>
        </div>

        <!-- 下载：有直链 → <a> 新标签打开；无直链 → 禁用 -->
        <a
          v-if="version.downloadUrl"
          class="body-download-btn"
          :href="version.downloadUrl"
          target="_blank"
          rel="noopener"
        >
          <span class="btn-icon">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </span>
          <span class="btn-text">下载</span>
        </a>
        <button v-else class="body-download-btn" disabled type="button">
          <span class="btn-icon">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </span>
          <span class="btn-text">暂无链接</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;

/* 手风琴单项 */
.accordion-item {
  background: #fff;
  border-radius: 18px;
  box-shadow: $shadow-card;
  border: 1px solid #eef2f6;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: #dce3ec;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  }
  &.active {
    border-color: $dl-blue;
    box-shadow: 0 4px 28px rgba(37, 99, 235, 0.1);
  }
}

/* 头部 */
.accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s;
  gap: 12px;
  background: transparent;
  border: none;
  width: 100%;
  font-family: inherit;
  text-align: left;
  color: inherit;

  &:hover {
    background: #fafcff;
  }
}

.accordion-item.active .accordion-header {
  background: #f8faff;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  flex: 1;
  min-width: 0;

  .type {
    font-weight: 600;
    font-size: 17px;
    color: $dl-ink;
  }
  .ver,
  .size-tag {
    font-size: 13px;
    color: $dl-faint;
    background: $dl-soft;
    padding: 0 12px;
    border-radius: 20px;
    line-height: 26px;
  }
  .ver {
    font-weight: 400;
    font-size: 14px;
    color: $dl-muted;
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #cbd5e1;
    flex-shrink: 0;
    transition: background 0.3s;
  }

  .arrow {
    transition: transform 0.3s ease;
    flex-shrink: 0;

    svg {
      width: 20px;
      height: 20px;
      stroke: $dl-faint;
      stroke-width: 2;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: stroke 0.2s;
    }
  }
}

.accordion-item.active .header-right {
  .status-dot {
    background: $dl-blue;
  }
  .arrow svg {
    stroke: $dl-blue;
  }
  .arrow {
    transform: rotate(180deg);
  }
}

/* 内容体：max-height 过渡展开 */
.accordion-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), padding 0.3s ease;
  padding: 0 24px;
}

.accordion-item.active .accordion-body {
  max-height: 1200px;
  padding: 0 24px 24px;
}

.body-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-top: 4px;
}

/* 配图 */
.body-image {
  width: 100%;
  max-width: 560px;
  border-radius: 16px;
  overflow: hidden;
  background: $dl-soft;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

  img {
    width: 100%;
    height: auto;
    display: block;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  .placeholder-img,
  .error-img {
    width: 100%;
    aspect-ratio: 16 / 9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: $dl-soft;
    color: $dl-faint;
    gap: 8px;

    svg {
      width: 44px;
      height: 44px;
      stroke: $dl-faint;
      fill: none;
      stroke-width: 1.5;
    }
    span {
      font-size: 13px;
    }
  }
}

/* 描述 */
.body-desc {
  font-size: 15px;
  line-height: 1.7;
  color: $dl-muted;
  max-width: 560px;
  text-align: center;
}

/* 元信息 */
.body-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px 32px;
  font-size: 14px;
  color: $dl-faint;

  .meta-item {
    display: flex;
    align-items: center;
    gap: 6px;

    svg {
      width: 17px;
      height: 17px;
      stroke: $dl-faint;
      fill: none;
      stroke-width: 1.8;
    }
    .value {
      color: #1e293b;
      font-weight: 500;
    }
  }
}

/* 下载按钮 */
.body-download-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 40px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: $dl-btn-grad;
  border: none;
  border-radius: 60px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.2);
  min-width: 160px;
  position: relative;
  overflow: hidden;
  text-decoration: none;

  .btn-icon svg {
    width: 20px;
    height: 20px;
    stroke: #fff;
    stroke-width: 2.2;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 2px 12px rgba(37, 99, 235, 0.1);
    background: linear-gradient(135deg, #94a3b8, #64748b);
  }
}

/* ===== 响应式 ===== */
@media (max-width: 640px) {
  .accordion-header {
    padding: 14px 16px;
    flex-wrap: wrap;
  }
  .header-left .type {
    font-size: 15px;
  }
  .header-left .ver {
    font-size: 13px;
    line-height: 22px;
    padding: 0 10px;
  }
  .header-left .size-tag {
    font-size: 12px;
    line-height: 22px;
    padding: 0 10px;
  }
  .accordion-body {
    padding: 0 16px;
  }
  .accordion-item.active .accordion-body {
    padding: 0 16px 18px;
  }
  .body-download-btn {
    padding: 12px 28px;
    font-size: 15px;
    min-width: 140px;
  }
  .body-meta {
    gap: 12px 20px;
    font-size: 13px;
  }
  .body-desc {
    font-size: 14px;
  }
}

@media (max-width: 400px) {
  .accordion-header {
    padding: 12px;
  }
  .header-left {
    gap: 8px;
  }
  .header-left .type {
    font-size: 14px;
  }
  .header-left .ver,
  .header-left .size-tag {
    font-size: 12px;
    line-height: 20px;
    padding: 0 8px;
  }
  .body-download-btn {
    padding: 10px 20px;
    font-size: 14px;
    min-width: 130px;
  }
  .body-meta {
    gap: 8px 14px;
    font-size: 12px;
  }
  .body-desc {
    font-size: 13px;
  }
}
</style>
