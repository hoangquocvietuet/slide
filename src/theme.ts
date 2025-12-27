// Theme configuration for interactive presentations

export const colors = {
  // Primary brand colors
  primary: '#4DA2FF',
  secondary: '#6FBCF0',

  // Backgrounds
  background: '#0B1426',
  backgroundLight: '#0f1d32',
  backgroundCard: 'rgba(15, 29, 50, 0.8)',

  // Accent colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Text colors
  text: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.5)',

  // Chart/visualization colors
  chartBlue: '#4DA2FF',
  chartGreen: '#10b981',
  chartOrange: '#f59e0b',
  chartPurple: '#8b5cf6',
  chartPink: '#ec4899',
  chartCyan: '#06b6d4',
} as const;

export const fonts = {
  header: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  code: '"Fira Code", "Monaco", "Consolas", monospace',
} as const;

export const fontSizes = {
  xs: '10px',
  sm: '12px',
  md: '14px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
  '5xl': '48px',
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
} as const;

export const borderRadius = {
  sm: '4px',
  md: '6px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px rgba(0, 0, 0, 0.3)',
  lg: '0 10px 25px rgba(0, 0, 0, 0.4)',
  glow: '0 0 20px rgba(77, 162, 255, 0.3)',
  glowGreen: '0 0 20px rgba(16, 185, 129, 0.3)',
} as const;

export const transitions = {
  fast: '150ms ease',
  normal: '300ms ease',
  slow: '500ms ease',
} as const;

// Spectacle theme configuration - Full viewport slides
export const spectacleTheme = {
  colors: {
    primary: colors.text,
    secondary: colors.textSecondary,
    tertiary: colors.background,
    quaternary: colors.primary,
    quinary: colors.secondary,
  },
  fonts: {
    header: fonts.header,
    text: fonts.body,
    monospace: fonts.code,
  },
  fontSizes: {
    h1: fontSizes['5xl'],
    h2: fontSizes['4xl'],
    h3: fontSizes['3xl'],
    text: fontSizes.lg,
    monospace: fontSizes.md,
  },
  space: [0, 8, 16, 24, 32, 48, 64],
};

// Glassmorphism card style
export const glassCard = {
  background: 'rgba(15, 29, 50, 0.6)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(77, 162, 255, 0.2)',
  borderRadius: borderRadius.lg,
};

// Common component styles
export const styles = {
  // Formula box styling
  formulaBox: {
    background: 'rgba(77, 162, 255, 0.1)',
    border: `1px solid ${colors.primary}`,
    borderRadius: borderRadius.md,
    padding: `${spacing.sm} ${spacing.md}`,
    fontFamily: fonts.code,
    fontSize: fontSizes.lg,
    color: colors.primary,
  },

  // Code block styling
  codeBlock: {
    background: 'rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontFamily: fonts.code,
    fontSize: fontSizes.sm,
    lineHeight: 1.6,
    overflow: 'auto',
  },

  // Legend item styling
  legendItem: (color: string) => ({
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    '&::before': {
      content: '""',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: color,
    },
  }),

  // Step indicator styling
  stepIndicator: (isActive: boolean, color: string = colors.primary) => ({
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: fontSizes.sm,
    fontWeight: 600,
    background: isActive ? color : 'rgba(255, 255, 255, 0.1)',
    color: isActive ? '#000' : colors.textMuted,
    transition: transitions.normal,
  }),

  // Info card styling
  infoCard: {
    ...glassCard,
    padding: spacing.md,
  },

  // Button styling
  button: {
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
    border: 'none',
    borderRadius: borderRadius.md,
    padding: `${spacing.sm} ${spacing.lg}`,
    color: colors.text,
    fontSize: fontSizes.md,
    fontWeight: 600,
    cursor: 'pointer',
    transition: transitions.normal,
  },

  // Slider styling
  slider: {
    width: '100%',
    height: '6px',
    borderRadius: borderRadius.full,
    background: 'rgba(255, 255, 255, 0.2)',
    outline: 'none',
    cursor: 'pointer',
  },
};
