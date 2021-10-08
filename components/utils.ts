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
