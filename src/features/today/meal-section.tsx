import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import type { LogEntry, Meal } from '@/db/schema';
import { Button } from '@/ui/components/button';
import { Card } from '@/ui/components/card';
import { Typography } from '@/ui/components/typography';
import { formatGrams, formatKcal } from '@/ui/format';

const mealTitles: Record<Meal, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snacks: 'Snacks',
};

type MealSectionProps = {
  date: string;
  meal: Meal;
  entries: LogEntry[];
};

export function MealSection({ date, meal, entries }: MealSectionProps) {
  const kcal = entries.reduce((total, entry) => total + entry.kcal, 0);

  return (
    <Card>
      <View style={styles.header}>
        <Typography variant="subheading">{mealTitles[meal]}</Typography>
        <Typography variant="number" tone="muted">
          {formatKcal(kcal)} kcal
        </Typography>
      </View>

      {entries.map((entry) => (
        <Pressable
          key={entry.id}
          style={({ pressed }) => [styles.entry, pressed && styles.pressed]}
          onPress={() => router.push({ pathname: '/quick-entry', params: { id: entry.id } })}
        >
          <View style={styles.entryText}>
            <Typography numberOfLines={1}>{entry.name}</Typography>
            <Typography variant="caption" tone="muted">
              {macrosLine(entry)}
            </Typography>
          </View>
          <Typography variant="number">{formatKcal(entry.kcal)}</Typography>
        </Pressable>
      ))}

      <Button
        title="Quick Entry"
        variant="secondary"
        onPress={() => router.push({ pathname: '/quick-entry', params: { date, meal } })}
      />
    </Card>
  );
}

function macrosLine(entry: LogEntry): string {
  const parts = [
    entry.protein !== null && `P ${formatGrams(entry.protein)}`,
    entry.carbs !== null && `C ${formatGrams(entry.carbs)}`,
    entry.fat !== null && `F ${formatGrams(entry.fat)}`,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(' · ') : 'No macros';
}

const styles = StyleSheet.create((theme) => ({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  entryText: {
    flex: 1,
  },
  pressed: {
    opacity: 0.6,
  },
}));
