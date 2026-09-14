const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

const radii = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

// iOS uses the PostScript names of the fonts embedded by expo-font.
const fonts = {
  regular: 'Geist-Regular',
  medium: 'Geist-Medium',
  semiBold: 'Geist-SemiBold',
  bold: 'Geist-Bold',
  mono: 'GeistMono-Regular',
  monoMedium: 'GeistMono-Medium',
} as const;

const typography = {
  display: { fontFamily: fonts.monoMedium, fontSize: 44, lineHeight: 52 },
  title: { fontFamily: fonts.bold, fontSize: 34, lineHeight: 41 },
  heading: { fontFamily: fonts.semiBold, fontSize: 22, lineHeight: 28 },
  subheading: { fontFamily: fonts.semiBold, fontSize: 17, lineHeight: 22 },
  body: { fontFamily: fonts.regular, fontSize: 17, lineHeight: 22 },
  label: { fontFamily: fonts.medium, fontSize: 15, lineHeight: 20 },
  caption: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 18 },
  number: { fontFamily: fonts.monoMedium, fontSize: 17, lineHeight: 22 },
} as const;

const shared = { spacing, radii, fonts, typography };

export const lightTheme = {
  ...shared,
  colors: {
    background: '#F2F2F7',
    surface: '#FFFFFF',
    text: '#0A0A0A',
    textMuted: '#6B6B70',
    border: '#E4E4E7',
    accent: '#16A34A',
    onAccent: '#FFFFFF',
    danger: '#DC2626',
    kcal: '#F97316',
    protein: '#3B82F6',
    carbs: '#EAB308',
    fat: '#A855F7',
  },
} as const;

export const darkTheme = {
  ...shared,
  colors: {
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FAFAFA',
    textMuted: '#A1A1AA',
    border: '#2C2C2E',
    accent: '#22C55E',
    onAccent: '#052E16',
    danger: '#EF4444',
    kcal: '#FB923C',
    protein: '#60A5FA',
    carbs: '#FACC15',
    fat: '#C084FC',
  },
} as const;
