import { useUnistyles } from 'react-native-unistyles';

export function useStackScreenOptions() {
  const { theme } = useUnistyles();

  return {
    headerLargeTitle: true,
    headerTransparent: true,
    headerTitleStyle: { fontFamily: theme.fonts.semiBold, color: theme.colors.text },
    headerLargeTitleStyle: { fontFamily: theme.fonts.bold, color: theme.colors.text },
    contentStyle: { backgroundColor: theme.colors.background },
  };
}
