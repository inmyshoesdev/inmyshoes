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
