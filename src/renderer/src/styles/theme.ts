export const theme = {
  color: {
    bg: '#0b0b0e',
    bgGradient:
      'radial-gradient(1200px circle at 15% -10%, rgba(143, 149, 204, 0.10), transparent 55%), radial-gradient(1000px circle at 100% 0%, rgba(204, 171, 143, 0.06), transparent 45%), #0b0b0e',
    panel: 'rgba(255, 255, 255, 0.035)',
    panelHover: 'rgba(255, 255, 255, 0.065)',
    panelActive: 'rgba(255, 255, 255, 0.09)',
    panelBorder: 'rgba(255, 255, 255, 0.07)',
    panelBorderHover: 'rgba(255, 255, 255, 0.14)',
    surface: 'rgba(20, 21, 26, 0.72)',

    text: '#f5f5f7',
    textSecondary: 'rgba(245, 245, 247, 0.6)',
    textTertiary: 'rgba(245, 245, 247, 0.36)',

    accent: '#8f95cc',
    accentStrong: '#aab0e0',
    accentSoft: 'rgba(143, 149, 204, 0.14)',
    accentGradient: 'linear-gradient(135deg, #aab0e0 0%, #8f95cc 55%, #5f658c 100%)',

    amber: '#ccab8f',
    amberSoft: 'rgba(204, 171, 143, 0.14)',

    danger: '#ff6b6b',
    success: '#5fd97e'
  },
  radius: {
    sm: '10px',
    md: '14px',
    lg: '20px',
    xl: '26px',
    pill: '999px'
  },
  blur: {
    sm: 'blur(12px)',
    md: 'blur(24px)',
    lg: 'blur(40px)'
  },
  shadow: {
    soft: '0 8px 24px rgba(0, 0, 0, 0.28)',
    lift: '0 24px 48px rgba(0, 0, 0, 0.45)',
    glow: '0 12px 32px rgba(154, 160, 217, 0.22)'
  },
  ease: [0.16, 1, 0.3, 1] as const,
  easeCss: 'cubic-bezier(0.16, 1, 0.3, 1)',
  spring: {
    snappy: { type: 'spring' as const, stiffness: 380, damping: 28 },
    soft: { type: 'spring' as const, stiffness: 220, damping: 26 }
  },
  transition: '0.35s cubic-bezier(0.16, 1, 0.3, 1)'
}

export type Theme = typeof theme
