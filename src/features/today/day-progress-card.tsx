import { View, type DimensionValue } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import type { DailyGoal } from '@/db/schema';
import type { dayProgress } from '@/domain/day-progress';
import { Card } from '@/ui/components/card';
import { Typography } from '@/ui/components/typography';
import { formatGrams, formatKcal } from '@/ui/format';

type DayProgressCardProps = {
  progress: ReturnType<typeof dayProgress>;
  goal: DailyGoal | null;
};

export function DayProgressCard({ progress, goal }: DayProgressCardProps) {
  if (!goal || !progress.remaining) {
    return (
      <Card>
        <Typography variant="display">{formatKcal(progress.consumed.kcal)}</Typography>
        <Typography tone="muted">kcal eaten. Set a Daily Goal in Settings to see what is left.</Typography>
      </Card>
    );
  }

  const isOver = progress.remaining.kcal < 0;

  return (
    <Card>
      <View>
        <Typography variant="display" tone={isOver ? 'danger' : 'primary'}>
          {formatKcal(Math.abs(progress.remaining.kcal))}
        </Typography>
        <Typography tone="muted">
          {isOver ? 'kcal over' : 'kcal left'} · {formatKcal(progress.consumed.kcal)} of {formatKcal(goal.kcal)}
        </Typography>
      </View>
      <MacroBar label="Protein" color="protein" consumed={progress.consumed.protein} target={goal.proteinG} />
      <MacroBar label="Carbs" color="carbs" consumed={progress.consumed.carbs} target={goal.carbsG} />
      <MacroBar label="Fat" color="fat" consumed={progress.consumed.fat} target={goal.fatG} />
    </Card>
  );
}

type MacroBarProps = {
  label: string;
  color: 'protein' | 'carbs' | 'fat';
  consumed: number;
  target: number;
};

function MacroBar({ label, color, consumed, target }: MacroBarProps) {
  const ratio = target > 0 ? Math.min(consumed / target, 1) : 0;

  return (
    <View style={styles.macro}>
      <View style={styles.macroLabels}>
        <Typography variant="label">{label}</Typography>
        <Typography variant="caption" tone="muted">
          {formatGrams(consumed)} / {formatGrams(target)} g
        </Typography>
      </View>
      <View style={styles.track}>
        <View style={styles.fill(color, `${Math.round(ratio * 100)}%`)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  macro: {
    gap: theme.spacing.xs,
  },
  macroLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  track: {
    height: 6,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.border,
    overflow: 'hidden',
  },
  fill: (color: 'protein' | 'carbs' | 'fat', width: DimensionValue) => ({
    height: '100%',
    width,
    backgroundColor: theme.colors[color],
  }),
}));
