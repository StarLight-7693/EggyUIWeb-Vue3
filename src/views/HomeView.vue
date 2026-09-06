<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import indexVideo from '@/assets/videos/index.mp4'
import eggRed from '@/assets/images/egg_red.webp'
import { useScrollVideo } from '@/composables/useScrollVideo'

const videoEl = ref<HTMLVideoElement | null>(null)
const containerEl = ref<HTMLElement | null>(null)
const loadingEl = ref<HTMLElement | null>(null)
const hintEl = ref<HTMLElement | null>(null)

// 首页核心：滚动逐帧同步视频（无任何数据请求）
useScrollVideo({
  video: videoEl,
  container: containerEl,
  loading: loadingEl,
  hint: hintEl,
})

function onCardImageLoaded(e: Event) {
  ;(e.target as HTMLImageElement).classList.add('loaded')
}
</script>

<template>
  <!-- 视频粘性层（sticky） -->
  <div class="video-wrapper">
    <video
      ref="videoEl"
      muted
      playsinline
      preload="metadata"
      crossorigin="anonymous"
      :src="indexVideo"
    ></video>
    <div ref="loadingEl" class="loading-placeholder">
      <div class="spinner"></div>
    </div>
  </div>

  <!-- 滚动撑高容器 -->
  <div ref="containerEl" class="scroll-container"></div>

  <!-- 底部内容 -->
  <div class="bottom-content">
    <div class="inner">
      <span class="badge">✦ 继续探索</span>

      <!-- 下载卡片 -->
      <RouterLink to="/download" class="download-card">
        <div class="card-content">
          <span class="icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </span>
          <h2>立即 <span class="highlight">下载</span></h2>
          <p>获取最新版本 · Windows 7/11 · 完全免费</p>
          <span class="arrow-hint">
            前往下载
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
        <div class="card-image">
          <img
            :src="eggRed"
            alt="下载插图"
            loading="lazy"
            @load="onCardImageLoaded"
            @error="onCardImageLoaded"
          />
          <div class="image-placeholder">插图位置</div>
        </div>
      </RouterLink>

      <!-- 操作栏 -->
      <div class="action-bar">
        <div class="social-links">
          <a href="https://gitcode.com/eggy-ui-team" target="_blank" rel="noopener">
            <span class="emoji">
              <svg viewBox="0 0 1024 1024" fill="currentColor" aria-hidden="true">
                <path d="M512 1024q-104 0-199-40-92-39-163-110T40 711Q0 616 0 512t40-199Q79 221 150 150T313 40q95-40 199-40t199 40q92 39 163 110t110 163q40 95 40 199t-40 199q-39 92-110 163T711 984q-95 40-199 40z m259-569H480q-10 0-17.5 7.5T455 480v64q0 10 7.5 17.5T480 569h177q11 0 18.5 7.5T683 594v13q0 31-22.5 53.5T607 683H367q-11 0-18.5-7.5T341 657V417q0-31 22.5-53.5T417 341h354q11 0 18-7t7-18v-63q0-11-7-18t-18-7H417q-38 0-72.5 14T283 283q-27 27-41 61.5T228 417v354q0 11 7 18t18 7h373q46 0 85.5-22.5t62-62Q796 672 796 626V480q0-10-7-17.5t-18-7.5z" />
              </svg>
            </span>
            Gitee
          </a>
        </div>
      </div>

      <div class="copyright">© EggyUI</div>
    </div>
  </div>

  <!-- 滚动提示 -->
  <div ref="hintEl" class="scroll-hint">↓ 滚动控制视频 · 逐帧同步 ↓</div>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

/* ===== 视频粘性层 ===== */
.video-wrapper {
  position: sticky;
  top: $header-h;
  left: 0;
  width: 100vw;
  height: calc(100vh - #{$header-h});
  height: calc(100dvh - #{$header-h});
  overflow: hidden;
  z-index: 1;
  background: $surface-2;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    background: $surface-2;
  }
}

/* 加载占位 */
.loading-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 0;
  background: $surface;
  transition: opacity 0.8s ease;

  .spinner {
    width: 48px;
    height: 48px;
    border: 3px solid rgba(0, 0, 0, 0.06);
    border-top-color: $brand-1;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .load-msg {
    margin-top: 16px;
    color: #888;
    font-size: 14px;
  }
}

.video-wrapper video.loaded + .loading-placeholder {
  opacity: 0;
  pointer-events: none;
}

/* 滚动撑高容器 */
.scroll-container {
  position: relative;
  width: 100%;
  z-index: 2;
  pointer-events: none;
  margin-top: $header-h;
}

/* ===== 底部内容区 ===== */
.bottom-content {
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  background: linear-gradient(160deg, #fffdf6 0%, #fdf6e7 50%, #f9edda 100%);
  padding: 40px 24px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 3;
  border-top: 1px solid $line;
  box-shadow: 0 -20px 60px rgba(0, 0, 0, 0.04);
  pointer-events: auto;

  .inner {
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
}

.badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(26, 26, 46, 0.3);
  background: rgba(255, 255, 255, 0.5);
  padding: 4px 18px;
  border-radius: 30px;
  border: 1px solid $line;
  margin-bottom: 28px;
  backdrop-filter: blur(4px);
}

/* 下载卡片 */
.download-card {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  background: $card-bg;
  border-radius: $radius-lg;
  box-shadow: $shadow-float;
  border: 1px solid rgba(255, 255, 255, 0.6);
  transition: transform 0.25s ease, box-shadow 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  pointer-events: auto;
  margin-bottom: 32px;
  overflow: hidden;
  position: relative;

  &:hover {
    border-color: rgba(255, 159, 26, 0.15);
  }
  &:active {
    transform: scale(0.98);
  }

  .card-content {
    flex: 1 1 60%;
    padding: 48px 36px 44px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
    position: relative;
    z-index: 2;

    .icon-wrap {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 14px;
      color: $home-ink;
      line-height: 1;

      svg {
        width: 52px;
        height: 52px;
        display: block;
        stroke: $home-ink;
        flex-shrink: 0;
      }
    }

    h2 {
      font-size: clamp(1.8rem, 4vw, 2.8rem);
      font-weight: 700;
      letter-spacing: -0.02em;
      color: $home-ink;
      margin-bottom: 6px;

      .highlight {
        background: $brand-grad;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }

    p {
      font-size: clamp(0.95rem, 1.2vw, 1.15rem);
      font-weight: 300;
      color: $home-muted;
      margin-bottom: 22px;
      line-height: 1.6;
      max-width: 420px;
    }

    .arrow-hint {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      font-weight: 500;
      color: $brand-1;
      background: rgba(255, 159, 26, 0.06);
      padding: 6px 22px;
      border-radius: 30px;
      border: 1px solid rgba(255, 159, 26, 0.08);
      transition: background 0.3s ease, transform 0.3s ease;
      line-height: 1.4;

      svg {
        display: inline-block;
        vertical-align: middle;
        flex-shrink: 0;
        stroke: $brand-1;
        width: 18px;
        height: 18px;
        transition: transform 0.3s ease;
      }
    }
  }

  &:hover .card-content .arrow-hint {
    background: rgba(255, 159, 26, 0.12);
    svg {
      transform: translateX(4px);
    }
  }

  .card-image {
    flex: 0 0 38%;
    min-height: 240px;
    background: $surface;
    position: relative;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      position: relative;
      z-index: 1;
      opacity: 0;
      transition: opacity 0.6s ease, transform 0.5s ease;

      &.loaded {
        opacity: 1;
      }
    }

    &:hover img {
      transform: scale(1.02);
    }

    .image-placeholder {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e8ecf3;
      color: rgba(26, 26, 46, 0.15);
      font-size: 13px;
      letter-spacing: 1px;
      pointer-events: none;
      z-index: 0;
      transition: opacity 0.6s ease;
    }
  }

  .card-image img.loaded + .image-placeholder {
    opacity: 0;
  }
}

/* 操作栏 */
.action-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 18px 28px;
  margin-top: 8px;
  padding-top: 24px;
  border-top: 1px solid $line;
  width: 100%;

  .social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    a {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 18px;
      border-radius: 30px;
      background: rgba(255, 255, 255, 0.6);
      border: 1px solid rgba(0, 0, 0, 0.03);
      color: $home-muted;
      text-decoration: none;
      font-size: 13px;
      transition: all 0.3s ease;
      pointer-events: auto;
      backdrop-filter: blur(4px);
      line-height: 1.4;

      &:hover {
        background: #fff;
        border-color: rgba(0, 0, 0, 0.06);
        color: $home-ink;
      }

      .emoji {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;

        svg {
          width: 16px;
          height: 16px;
          display: block;
          flex-shrink: 0;
        }
      }
    }
  }
}

.copyright {
  margin-top: 32px;
  font-size: 13px;
  color: $home-faint;
  letter-spacing: 0.3px;
  pointer-events: auto;
}

/* 滚动提示 */
.scroll-hint {
  position: fixed;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  font-size: 12px;
  color: $home-faint;
  letter-spacing: 3px;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  padding: 6px 24px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  transition: opacity 0.8s ease;
  pointer-events: none;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.02);

  &.hidden {
    opacity: 0;
  }
}

/* ===== 响应式 ===== */
@include respond-below($bp-md) {
  .download-card {
    flex-direction: column;
    border-radius: 24px;

    .card-content {
      padding: 36px 28px 30px;
      align-items: center;
      text-align: center;

      p {
        max-width: 100%;
      }
    }

    .card-image {
      flex: 0 0 220px;
      min-height: 180px;
      order: -1;
    }
  }
}

@include respond-below($bp-2xs) {
  .bottom-content {
    padding: 24px 14px 20px;
  }

  .download-card .card-content {
    padding: 28px 18px 24px;

    .icon-wrap svg {
      width: 40px;
      height: 40px;
    }
    h2 {
      font-size: 1.5rem;
    }
    p {
      font-size: 0.9rem;
      margin-bottom: 16px;
    }
  }

  .download-card .card-image {
    flex: 0 0 160px;
    min-height: 140px;
  }

  .action-bar {
    gap: 12px 16px;
    flex-direction: column;
    align-items: stretch;

    .social-links {
      justify-content: center;

      a {
        padding: 6px 14px;
        font-size: 12px;

        .emoji svg {
          width: 14px;
          height: 14px;
        }
      }
    }
  }

  .scroll-hint {
    bottom: 16px;
    font-size: 10px;
    padding: 4px 16px;
  }

  .badge {
    font-size: 10px;
    margin-bottom: 20px;
  }
}

@include respond-below($bp-4xs) {
  .download-card .card-content {
    h2 {
      font-size: 1.3rem;
    }
    p {
      font-size: 0.82rem;
    }
    .icon-wrap svg {
      width: 36px;
      height: 36px;
    }
  }

  .download-card .card-image {
    flex: 0 0 130px;
    min-height: 110px;
  }
}
</style>
