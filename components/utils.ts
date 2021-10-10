import MarkdownIt from 'markdown-it'

export function getAnimationClass(effect: string) {
  switch (effect) {
    case 'pulse':
      return 'animate-pulse'
    case 'bounce':
      return 'animate-bounce'
    case 'ping':
      return 'animate-ping'
    case 'spin':
      return 'animate-spin'
    case 'wiggle':
      return 'animate-wiggle'
    default:
      return ''
  }
}

// returns string representation of Html
export const renderMdToHtml = (raw: string): string => {
  const mdParser = new MarkdownIt({ breaks: true })
  return mdParser.renderInline(raw)
}

export function toggleFullScreen(): void {
  const dom = document.documentElement as any
  if (!document.fullscreenElement) {
    if (document.documentElement?.requestFullscreen) {
      document.documentElement.requestFullscreen()
    } else if (dom.mozRequestFullScreen) {
      dom.mozRequestFullScreen()
    } else if (dom.webkitRequestFullScreen) {
      dom.webkitRequestFullScreen()
    } else if (dom.msRequestFullscreen) {
      dom.msRequestFullscreen()
    }
  } else {
    const doc = document as any
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen()
    } else if (doc.webkitCancelFullScreen) {
      doc.webkitCancelFullScreen()
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen()
    }
  }
}
