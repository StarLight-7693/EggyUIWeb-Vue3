<script setup lang="ts">
import { RouterLink } from 'vue-router';
import eggRed from '@/assets/images/egg_red.webp';

// 图片加载完成后淡入（替代占位符）
function onCardImageLoaded(e: Event) {
  (e.target as HTMLImageElement).classList.add('loaded');
}
</script>

<template>
  <div class="home-page">
    <!-- 首页主视觉（hero 版式） -->
    <section class="hero-section">
      <div class="hero-card">
        <h1 class="hero-title">EggyUI - Windows桌面美化主题包</h1>
        <p class="hero-desc">
          深度复刻热门游戏《蛋仔派对》的视觉风格，为您的 Windows 桌面带来充满活力和趣味的游戏化界面体验
        </p>

        <div class="hero-warning">
          <h3><i class="warn-icon">!</i> 重要说明</h3>
          <p>
            EggyUI 只是一个普通的 Windows 桌面美化包，不适用于手机系统或其他操作系统。本项目为《蛋仔派对》游戏的二次创作作品，严格禁止任何商业用途。
          </p>
        </div>

        <div class="hero-image-wrap">
          <img
            src="https://img.remit.ee/i/I3PwI8fU1dJ9"
            alt="EggyUI 3.5 宣传图"
            class="hero-image"
            loading="lazy"
            @load="onCardImageLoaded"
            @error="onCardImageLoaded"
          />
          <div class="image-placeholder">插图位置</div>
        </div>
      </div>
    </section>

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
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

/* ===== 首页根容器 ===== */
.home-page {
  width: 100%;
}

/* ===== 首页主视觉（hero） ===== */
.hero-section {
  width: 100%;
  padding: calc(#{$header-h} + 40px) 24px 48px;
  background: $page-grad;
  display: flex;
  justify-content: center;
}

.hero-card {
  max-width: 1060px;
  width: 100%;
  background: $card-bg;
  border-radius: $radius-lg;
  box-shadow: $shadow-float;
  border: 1px solid rgba(255, 255, 255, 0.6);
  padding: 48px 40px;
  text-align: center;
}

.hero-title {
  font-size: clamp(1.8rem, 5vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.25;
  background: $brand-grad;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 18px;
}

.hero-desc {
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  font-weight: 300;
  color: $home-muted;
  max-width: 720px;
  margin: 0 auto;
  line-height: 1.7;
}

/* 重要说明（警告框） */
.hero-warning {
  background: rgba(255, 197, 61, 0.14);
  border-left: 4px solid $brand-2;
  border-radius: $radius-sm;
  padding: 18px 22px;
  margin: 28px auto 0;
  max-width: 760px;
  text-align: left;

  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    font-weight: 600;
    color: $dl-blue-deep;
    margin-bottom: 8px;

    .warn-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: $brand-2;
      color: #fff;
      font-size: 13px;
      font-weight: 700;
      font-style: normal;
      flex-shrink: 0;
    }
  }

  p {
    font-size: 0.95rem;
    color: $home-muted;
    line-height: 1.7;
  }
}

/* 宣传图 */
.hero-image-wrap {
  position: relative;
  margin-top: 28px;
  border-radius: $radius-md;
  overflow: hidden;
  background: $surface;

  .hero-image {
    width: 100%;
    display: block;
    position: relative;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.6s ease;

    &.loaded {
      opacity: 1;
    }
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

  .hero-image.loaded + .image-placeholder {
    opacity: 0;
  }
}

/* ===== 窄屏（手机 / 平板）：hero 与 bottom-content 融为一体 ===== */
@include respond-below($bp-md) {
  .home-page {
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    /* 整页统一暖奶油渐变，避免上下两块背景出现接缝 */
    background: $page-grad;

    .hero-section {
      flex: 0 0 auto;
      padding: calc(#{$header-h-md} + 18px) 20px 4px;
      background: transparent;
    }

    /* 去掉白色卡片外观，内容直接铺在同一条渐变上 */
    .hero-card {
      padding: 0;
      background: transparent;
      border: none;
      box-shadow: none;
      border-radius: 0;
    }

    .hero-image-wrap {
      margin-top: 22px;
      border: 1px solid rgba(255, 255, 255, 0.7);
      box-shadow: $shadow-card;
    }

    /* 底部内容不再另起一层：去掉分隔线与上浮阴影 */
    .bottom-content {
      flex: 1 1 auto;
      min-height: 0;
      padding: 28px 20px 36px;
      justify-content: flex-start;
      background: transparent;
      border-top: none;
      box-shadow: none;
    }
  }
}

@include respond-below($bp-3xs) {
  .home-page .hero-section {
    padding-top: calc(#{$header-h-xs} + 14px);
  }
}

/* ===== 底部内容区 ===== */
.bottom-content {
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  background: $page-grad;
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

/* ===== 响应式 ===== */
@include respond-below($bp-md) {
  .hero-section {
    padding: calc(#{$header-h-md} + 24px) 16px 32px;
  }

  .hero-card {
    padding: 36px 24px;
  }

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

  .hero-section {
    padding: calc(#{$header-h-xs} + 16px) 14px 24px;
  }

  .hero-card {
    padding: 28px 18px;
    border-radius: $radius-md;
  }

  .hero-title {
    font-size: 1.5rem;
  }

  .hero-warning {
    padding: 14px 16px;

    p {
      font-size: 0.88rem;
    }
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
