<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { usePersonalityTest } from '@/composables/usePersonalityTest';

const {
  stage,
  total,
  currentQuestion,
  questionNo,
  progressPercent,
  result,
  highlightLines,
  start,
  selectOption,
  restart,
} = usePersonalityTest();
</script>

<template>
  <div class="test-page">
    <div class="container">
      <!-- 欢迎页 -->
      <section v-if="stage === 'welcome'" class="card welcome">
        <h1>✨ 蛋仔专属性格测试小游戏 ✨</h1>
        <p class="intro">
          这里可以通过你的日常性格+游戏习惯，测出最适配你的专属蛋仔角色！<br />
          全程一问一答，没有标准答案，只用最真实的你匹配专属蛋仔~
        </p>
        <button class="btn btn--primary" type="button" @click="start">开始测试 🚀</button>
      </section>

      <!-- 答题页 -->
      <section v-else-if="stage === 'question' && currentQuestion" class="card question">
        <div class="progress">
          <div class="progress-bar" :style="{ width: `${progressPercent}%` }"></div>
        </div>

        <div class="question-head">
          <span class="question-tag">{{ currentQuestion.tag }}</span>
          <span class="question-count">第 {{ questionNo }} / {{ total }} 题</span>
        </div>

        <h2 class="question-text">{{ currentQuestion.text }}</h2>

        <div class="options">
          <button
            v-for="option in currentQuestion.options"
            :key="option.key"
            class="option"
            type="button"
            @click="selectOption(option.key)"
          >
            <span class="option-key">{{ option.key }}</span>
            <span class="option-text">{{ option.text }}</span>
          </button>
        </div>
      </section>

      <!-- 结果页 -->
      <section v-else-if="stage === 'result' && result" class="card result">
        <div class="result-avatar" :style="{ borderColor: result.color }">
          <img :src="result.avatar" :alt="result.name" />
        </div>
        <h2 class="result-name">{{ result.name }}</h2>
        <p class="result-tag" :style="{ color: result.color }">{{ result.tag }}</p>

        <div class="result-desc">
          <h3>【角色专属人设】</h3>
          <p>{{ result.desc }}</p>
          <h3>【你的性格亮点】</h3>
          <p v-for="(line, index) in highlightLines" :key="index">{{ line }}</p>
        </div>

        <button class="btn btn--ghost" type="button" @click="restart">重新测试</button>
      </section>

      <RouterLink class="back-link" to="/about">← 返回关于页</RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

/* ===== 页面容器（内页暖奶油底，对齐关于页/首页）===== */
.test-page {
  min-height: 100dvh;
  background: $page-grad;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(#{$header-h} + 40px) 20px 56px;
}

.container {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

/* 卡片基底：站点通用毛玻璃白卡 */
.card {
  @include glass($glass-card-bg, 10px, 1);
  width: 100%;
  padding: 32px;
  border: 1px solid $glass-card-border;
  border-radius: $radius-card;
  box-shadow: $shadow-float;
}

/* ===== 欢迎页 ===== */
.welcome {
  text-align: center;

  h1 {
    font-size: 26px;
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: -0.02em;
    background: $brand-grad;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .intro {
    margin-top: 12px;
    color: $dl-muted;
    font-size: 15px;
    line-height: 1.8;
  }
}

/* ===== 按钮（品牌渐变主按钮 / 中性次按钮）===== */
.btn {
  width: 100%;
  padding: 15px;
  border: 1px solid transparent;
  border-radius: $radius-full;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease,
    border-color 0.25s ease;

  &--primary {
    margin-top: 24px;
    background: $brand-grad;
    color: #fff;
    box-shadow: 0 6px 18px rgba(255, 159, 26, 0.28);
  }

  &--ghost {
    background: $dl-soft;
    border-color: $dl-border;
    color: $dl-ink;

    &:hover {
      background: #fff;
      border-color: rgba(255, 159, 26, 0.3);
    }
  }
}

/* ===== 答题页 ===== */
.progress {
  height: 6px;
  margin-bottom: 20px;
  border-radius: $radius-full;
  background: $surface-2;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: $radius-full;
  background: $brand-grad;
  transition: width 0.3s ease;
}

.question-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.question-tag {
  padding: 5px 14px;
  border-radius: $radius-full;
  background: $brand-grad;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
}

.question-count {
  color: $dl-faint;
  font-size: 13px;
}

.question-text {
  margin-bottom: 24px;
  color: $home-ink;
  font-size: 20px;
  line-height: 1.5;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 15px 16px;
  border: 2px solid $dl-border;
  border-radius: $radius-sm;
  background: #fff;
  color: $home-ink;
  font-size: 15px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;

  &:hover {
    border-color: $brand-1;
    background: rgba(255, 159, 26, 0.06);
  }

  .option-key {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: $brand-grad;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
  }

  .option-text {
    flex: 1;
    line-height: 1.5;
  }
}

/* ===== 结果页 ===== */
.result {
  text-align: center;
}

.result-avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  border: 4px solid $brand-1;
  border-radius: 50%;
  background: $surface;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.result-name {
  margin-bottom: 12px;
  color: $home-ink;
  font-size: 28px;
  font-weight: 700;
}

.result-tag {
  margin-bottom: 24px;
  color: $brand-1;
  font-size: 18px;
}

.result-desc {
  margin-bottom: 24px;
  padding: 16px;
  border-radius: $radius-sm;
  background: $dl-soft;
  text-align: left;

  h3 {
    margin-bottom: 12px;
    color: $brand-1;
    font-size: 17px;
  }

  p {
    margin-bottom: 12px;
    color: $dl-muted;
    line-height: 1.7;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

/* ===== 返回入口 ===== */
.back-link {
  color: $brand-1;
  font-size: 14px;
  text-decoration: none;
  transition: opacity 0.25s ease;

  &:hover {
    opacity: 0.7;
  }
}

/* ===== 响应式 ===== */
@include respond-below($bp-xs) {
  .test-page {
    padding: calc(#{$header-h-xs} + 24px) 16px 40px;
  }

  .card {
    padding: 22px;
    border-radius: $radius-md;
  }

  .welcome h1 {
    font-size: 22px;
  }

  .result-avatar {
    width: 100px;
    height: 100px;
  }
}
</style>
