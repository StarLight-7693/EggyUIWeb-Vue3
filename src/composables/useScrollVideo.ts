import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/**
 * useScrollVideo —— 首页「滚动逐帧控制视频」逻辑
 * 由原站 index.js 逐段移植并 TS 化。
 * 特性：滚动进度 → 视频时间同步、播放-暂停刷帧、窗口变化重算、
 *       空格回到顶部、进入页面回到顶部、加载超时/失败提示。
 */

export interface ScrollVideoOptions {
  video: Ref<HTMLVideoElement | null>
  /** 滚动撑高容器 */
  container: Ref<HTMLElement | null>
  /** 加载占位元素（超时/失败时注入提示） */
  loading: Ref<HTMLElement | null>
  /** 底部滚动提示，就绪 3 秒后淡出 */
  hint: Ref<HTMLElement | null>
  onReady?: () => void
}

const SCROLL_PX_PER_SECOND = 140
const HEADER_HEIGHT = 72
const LOAD_TIMEOUT = 5000

export function useScrollVideo(opts: ScrollVideoOptions) {
  let duration = 0
  let isLoaded = false
  let timerId: number | undefined
  let resizeId: number | undefined
  let loadHandler: (() => void) | undefined

  function showLoadingMessage(msg: string) {
    const el = opts.loading.value
    if (!el) return
    const spinner = el.querySelector('.spinner')
    if (spinner) (spinner as HTMLElement).style.display = 'none'
    const existing = el.querySelector('.load-msg')
    if (existing) {
      existing.textContent = msg
      return
    }
    const span = document.createElement('span')
    span.className = 'load-msg'
    span.textContent = msg
    el.appendChild(span)
  }

  function applyHeight() {
    const c = opts.container.value
    if (!c) return
    const viewH = window.innerHeight
    const videoScrollH = duration * SCROLL_PX_PER_SECOND
    c.style.height = `${viewH - HEADER_HEIGHT + videoScrollH}px`
  }

  function onVideoReady() {
    const v = opts.video.value
    if (!v) return
    duration = v.duration
    if (!isFinite(duration) || duration <= 0) {
      showLoadingMessage('⚠️ 视频时长无效')
      return
    }
    v.classList.add('loaded')
    applyHeight()
    isLoaded = true
    v.currentTime = 0
    v.muted = true
    v
      .play()
      .then(() => {
        v.pause()
      })
      .catch(() => {
        /* 激活失败可忽略 */
      })
    syncVideoOnScroll()
    window.setTimeout(() => opts.hint.value?.classList.add('hidden'), 3000)
    opts.onReady?.()
  }

  function syncVideoOnScroll() {
    if (!isLoaded || !duration) return
    const v = opts.video.value
    if (!v) return

    let docH = document.documentElement.scrollHeight
    let winH = window.innerHeight
    let maxScroll = docH - winH
    if (maxScroll <= 0) {
      applyHeight()
      docH = document.documentElement.scrollHeight
      maxScroll = docH - winH
      if (maxScroll <= 0) return
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0
    const progress = Math.min(1, Math.max(0, scrollTop / maxScroll))
    const targetTime = progress * duration

    try {
      if (Math.abs(v.currentTime - targetTime) > 0.005) {
        v.currentTime = targetTime
        // seek 后短暂播放再暂停以刷新画面
        if (v.paused) {
          v
            .play()
            .then(() => {
              window.setTimeout(() => {
                if (!v.paused) v.pause()
              }, 30)
            })
            .catch(() => {
              /* ignore */
            })
        }
      }
    } catch {
      /* ignore */
    }
  }

  function onScroll() {
    syncVideoOnScroll()
  }

  function onResize() {
    if (resizeId) window.clearTimeout(resizeId)
    resizeId = window.setTimeout(() => {
      if (isLoaded && duration) {
        applyHeight()
        syncVideoOnScroll()
      }
    }, 200)
  }

  function onKeydown(e: KeyboardEvent) {
    const target = e.target as HTMLElement | null
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return
    if (e.code === 'Space') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  onMounted(() => {
    const v = opts.video.value
    if (!v) return
    v.addEventListener('loadedmetadata', onVideoReady)
    v.addEventListener('loadeddata', onVideoReady)
    loadHandler = () => {
      if (timerId) window.clearTimeout(timerId)
    }
    v.addEventListener('loadeddata', loadHandler)
    v.addEventListener('error', () => showLoadingMessage('⚠️ 视频加载失败'))

    if (v.readyState >= 3 && v.duration) onVideoReady()

    timerId = window.setTimeout(() => {
      if (!isLoaded) showLoadingMessage('⚠️ 加载超时')
    }, LOAD_TIMEOUT)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    document.addEventListener('keydown', onKeydown)

    // 进入页面回到顶部
    window.scrollTo(0, 0)
  })

  onBeforeUnmount(() => {
    const v = opts.video.value
    if (v) {
      v.removeEventListener('loadedmetadata', onVideoReady)
      v.removeEventListener('loadeddata', onVideoReady)
      if (loadHandler) v.removeEventListener('loadeddata', loadHandler)
    }
    if (timerId) window.clearTimeout(timerId)
    if (resizeId) window.clearTimeout(resizeId)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
    document.removeEventListener('keydown', onKeydown)
  })
}
