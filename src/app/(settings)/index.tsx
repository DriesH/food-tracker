import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useDailyGoals } from '@/db/daily-goals';
import { dailyGoalFor } from '@/domain/daily-goal';
import { todayDate } from '@/features/today/dates';
import { Card } from '@/ui/components/card';
import { Screen } from '@/ui/components/screen';
import { Typography } from '@/ui/components/typography';
import { formatGrams, formatKcal } from '@/ui/format';

export default function SettingsScreen() {
  const { goals } = useDailyGoals();
  const goal = dailyGoalFor(todayDate(), goals);

  return (
    <Screen>
      <Link href="/daily-goal" asChild>
        <Pressable>
          {({ pressed }) => (
            <Card style={pressed && styles.pressed}>
              <View style={styles.row}>
                <Typography variant="subheading">Daily Goal</Typography>
                <Typography variant="number" tone="muted">
                  {goal ? `${formatKcal(goal.kcal)} kcal` : 'Not set'}
                </Typography>
              </View>
              {goal && (
                <Typography variant="caption" tone="muted">
                  P {formatGrams(goal.proteinG)} g · C {formatGrams(goal.carbsG)} g · F {formatGrams(goal.fatG)} g
                </Typography>
              )}
            </Card>
          )}
        </Pressable>
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  pressed: {
    opacity: 0.6,
  },
});
