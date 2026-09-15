import { SymbolView } from 'expo-symbols';
import { Pressable, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Typography } from '@/ui/components/typography';

import { formatDayTitle, todayDate } from './dates';

type DaySwitcherProps = {
  date: string;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
};

export function DaySwitcher({ date, onPrevious, onNext, onToday }: DaySwitcherProps) {
  const { theme } = useUnistyles();
  const isToday = date === todayDate();

  return (
    <View style={styles.row}>
      <Pressable accessibilityLabel="Previous day" hitSlop={theme.spacing.md} onPress={onPrevious}>
        <SymbolView name="chevron.left" size={18} tintColor={theme.colors.text} />
      </Pressable>

      <Pressable accessibilityHint={isToday ? undefined : 'Go back to today'} disabled={isToday} onPress={onToday}>
        <Typography variant="subheading" numberOfLines={1} style={styles.title}>
          {formatDayTitle(date)}
        </Typography>
      </Pressable>

      <Pressable accessibilityLabel="Next day" hitSlop={theme.spacing.md} onPress={onNext}>
        <SymbolView name="chevron.right" size={18} tintColor={theme.colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  // Fixed width, so the arrows stay in place when the title changes.
  title: {
    width: 120,
    textAlign: 'center',
  },
}));
