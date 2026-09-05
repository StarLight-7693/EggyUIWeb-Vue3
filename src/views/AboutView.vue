<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { downloadMeta } from '@/data'

const versions = downloadMeta.versions || []
</script>

<template>
  <div class="about-page">
    <div class="container">
      <!-- Hero -->
      <section class="hero card">
        <h1>EggyUI</h1>
        <p class="subtitle">专为 Windows 11 打造的蛋仔派对风格桌面美化主题包</p>
        <div class="badges">
          <span class="chip">开发中</span>
          <span class="chip">粉丝向 · 非商用</span>
        </div>
        <p class="desc">
          EggyUI-RE 是原 EggyUI 主题包的重置版，设计灵感来源于网易游戏《蛋仔派对》。这是一款由粉丝创作的、非商业用途的
          Windows 桌面美化工具。
        </p>
      </section>

      <div class="layout">
        <!-- 主体 -->
        <main class="main">
          <!-- 项目重要说明 -->
          <section class="card">
            <h2>📋 项目重要说明</h2>
            <div class="sub-block">
              <h3>项目状态</h3>
              <p>此项目目前为 <strong>Dev（开发）</strong> 状态，功能可能不完整。</p>
            </div>
            <div class="sub-block">
              <h3>平台限制</h3>
              <p>仅支持 <strong>Windows 11</strong> 系统。安卓用户可使用 EggyUI for Android。</p>
            </div>
            <div class="sub-block">
              <h3>版权声明</h3>
              <ul>
                <li>本项目为粉丝二次创作，禁止用于任何商业用途</li>
                <li>未使用游戏解包/拆包素材，所有视觉元素来源于合规渠道或团队重置</li>
                <li>与微软（Microsoft Corporation）及网易官方无关</li>
                <li>Windows 是微软的注册商标，《蛋仔派对》是网易游戏的注册商标</li>
              </ul>
            </div>
          </section>

          <!-- 项目历史 -->
          <section class="card">
            <h2>📜 项目历史</h2>
            <p>
              <strong>EggyUI-Legacy</strong>（原项目）于 2024 年 7 月启动，2025 年 10 月首次归档。由于原项目架构难以维护，开发者于
              2025 年 12 月创建了 <strong>EggyUI-RE</strong>（重置版）。
            </p>
          </section>

          <!-- 环境要求与安装 -->
          <section class="card">
            <h2>⚙️ 环境要求与安装</h2>
            <div class="sub-block">
              <h3>使用环境</h3>
              <ul>
                <li>操作系统：Windows 11</li>
                <li>网络连接：必需</li>
              </ul>
            </div>
            <div class="sub-block">
              <h3>安装步骤</h3>
              <ol>
                <li>获取 EggyUI-RE 安装包</li>
                <li>运行安装程序并跟随指引</li>
                <li>安装完成后，打开桌面上的"检测安装"程序</li>
                <li>验证安装是否完整、正确</li>
              </ol>
            </div>
          </section>

          <!-- 版本下载 -->
          <section class="card">
            <h2>⬇️ 版本下载</h2>
            <p class="muted">前往下载页查看各版本详情；以下为当前收录的版本：</p>
            <div class="version-list">
              <RouterLink
                v-for="v in versions"
                :key="v.id"
                to="/download"
                class="version-item"
              >
                <span class="v-type">{{ v.type }}</span>
                <span v-if="v.version" class="v-ver">{{ v.version }}</span>
              </RouterLink>
            </div>
          </section>
        </main>

        <!-- 侧栏 -->
        <aside class="side">
          <section class="card">
            <h2>🔧 快速链接</h2>
            <ul class="links">
              <li>
                <a href="https://github.com/SYSTEM-LIGHT/EggyUI?tab=readme-ov-file" target="_blank" rel="noopener">
                  原项目发展历程
                </a>
              </li>
              <li>
                <a href="https://github.com/CN-RBL/EggyUI-RE" target="_blank" rel="noopener">EggyUI-RE 仓库</a>
              </li>
              <li>
                <a href="https://gitcode.com/eggy-ui-team" target="_blank" rel="noopener">GitCode</a>
              </li>
              <li>
                <a href="https://www.bilibili.com/video/BV1TPqrBpEpG/" target="_blank" rel="noopener">见证视频</a>
              </li>
            </ul>
          </section>

          <section class="card">
            <h2>📦 系统要求</h2>
            <ul class="kv">
              <li><span>操作系统</span><span>Windows 11</span></li>
              <li><span>Python版本</span><span>3.14.2（开发）</span></li>
              <li><span>网络</span><span>必需</span></li>
            </ul>
          </section>

          <section class="card">
            <h2>👥 社区与支持</h2>
            <p>如有问题或需要帮助，请加入我们的 QQ 群：<strong>1079576546</strong></p>
            <p class="small">注意：以上内容随时都会更改，如有疑问请加群询问！</p>
          </section>
        </aside>
      </div>

      <p class="footnote">本站「关于」文案与 EggyUI 现役官网保持一致。© EggyUI</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.about-page {
  min-height: 100dvh;
  background: linear-gradient(160deg, #f7f9fc 0%, #eef2f7 50%, #e4e9f2 100%);
  padding: calc(#{$header-h} + 40px) 20px 56px;
}

.container {
  max-width: 1060px;
  margin: 0 auto;
}

/* 卡片基底：白色圆角卡片 */
.card {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 24px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.02);
  padding: 28px 30px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  h2 {
    font-size: 1.25rem;
    color: $home-ink;
    margin-bottom: 16px;
    letter-spacing: -0.01em;
  }
}

/* Hero */
.hero {
  text-align: center;
  margin-bottom: 24px;
  padding: 40px 32px;

  h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    background: $brand-grad;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
  }

  .subtitle {
    margin-top: 10px;
    color: $dl-muted;
    font-size: clamp(1rem, 2vw, 1.2rem);
  }

  .badges {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 16px;

    .chip {
      font-size: 12px;
      letter-spacing: 1px;
      color: $dl-muted;
      background: $dl-soft;
      border: 1px solid $dl-border;
      padding: 4px 14px;
      border-radius: 30px;
    }
  }

  .desc {
    margin: 18px auto 0;
    max-width: 640px;
    color: $dl-muted;
    line-height: 1.8;
  }
}

/* 两栏布局 */
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;
  align-items: start;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.side {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sub-block {
  margin-bottom: 14px;

  h3 {
    font-size: 1rem;
    color: $home-ink;
    margin-bottom: 6px;
  }

  ul,
  ol {
    margin: 6px 0 0;
    padding-left: 22px;
    color: $dl-muted;
    line-height: 1.9;
  }
}

.muted {
  color: $dl-muted;
  margin-bottom: 12px;
}

/* 版本列表 */
.version-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.version-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 14px;
  background: #f8fafc;
  border: 1px solid $dl-border;
  color: inherit;
  text-decoration: none;
  transition: all 0.25s ease;

  &:hover {
    border-color: $brand-1;
  }

  .v-type {
    font-weight: 600;
    color: $dl-ink;
  }
  .v-ver {
    font-size: 13px;
    color: $dl-faint;
    background: $dl-soft;
    padding: 0 12px;
    border-radius: 20px;
    line-height: 26px;
  }
}

/* 侧栏链接 */
.links {
  list-style: none;
  padding: 0;
  margin: 0;

  li + li {
    margin-top: 10px;
  }

  a {
    display: block;
    padding: 10px 12px;
    border-radius: 12px;
    background: #f8fafc;
    border: 1px solid $dl-border;
    color: $brand-1;
    text-decoration: none;
    transition: all 0.25s ease;

    &:hover {
      background: #fff;
      border-color: rgba(74, 108, 247, 0.3);
    }
  }
}

.kv {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 8px 0;
    border-bottom: 1px dashed $dl-border;
    font-size: 14px;

    span:last-child {
      color: $dl-ink;
      font-weight: 600;
    }
  }
}

.small {
  font-size: 12px;
  color: $dl-faint;
  margin-top: 8px;
}

.footnote {
  margin-top: 24px;
  text-align: center;
  font-size: 12px;
  color: $home-faint;
}

/* ===== 响应式 ===== */
@include respond-below($bp-md) {
  .about-page {
    padding: calc(#{$header-h-md} + 24px) 16px 40px;
  }

  .layout {
    grid-template-columns: 1fr;
  }
}

@include respond-below($bp-xs) {
  .card {
    padding: 20px;
    border-radius: 18px;
  }

  .hero {
    padding: 28px 18px;
  }
}
</style>
