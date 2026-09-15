import { router } from 'expo-router';
import { useState } from 'react';

import { saveDailyGoal, useDailyGoals } from '@/db/daily-goals';
import type { DailyGoal } from '@/db/schema';
import { dailyGoalFor } from '@/domain/daily-goal';
import { todayDate } from '@/features/today/dates';
import { Button } from '@/ui/components/button';
import { Screen } from '@/ui/components/screen';
import { TextField } from '@/ui/components/text-field';
import { Typography } from '@/ui/components/typography';
import { parseDecimal } from '@/ui/format';

export function DailyGoalForm() {
  const { goals, isLoaded } = useDailyGoals();

  if (!isLoaded) {
    return null;
  }

  return <DailyGoalFields current={dailyGoalFor(todayDate(), goals)} />;
}

function DailyGoalFields({ current }: { current: DailyGoal | null }) {
  const [kcal, setKcal] = useState(current ? String(current.kcal) : '');
  const [protein, setProtein] = useState(current ? String(current.proteinG) : '');
  const [carbs, setCarbs] = useState(current ? String(current.carbsG) : '');
  const [fat, setFat] = useState(current ? String(current.fatG) : '');

  const values = {
    kcal: parseDecimal(kcal),
    proteinG: parseDecimal(protein),
    carbsG: parseDecimal(carbs),
    fatG: parseDecimal(fat),
  };
  const isValid =
    values.kcal !== null &&
    values.kcal > 0 &&
    [values.proteinG, values.carbsG, values.fatG].every((value) => value !== null && value >= 0);

  async function save() {
    if (!isValid) {
      return;
    }

    await saveDailyGoal({
      startsOn: todayDate(),
      kcal: values.kcal!,
      proteinG: values.proteinG!,
      carbsG: values.carbsG!,
      fatG: values.fatG!,
    });

    router.back();
  }

  return (
    <Screen>
      <Typography tone="muted">A new goal starts today. Past days keep the goal they had.</Typography>

      <TextField label="Energy" suffix="kcal" value={kcal} onChangeText={setKcal} keyboardType="decimal-pad" />
      <TextField label="Protein" suffix="g" value={protein} onChangeText={setProtein} keyboardType="decimal-pad" />
      <TextField label="Carbs" suffix="g" value={carbs} onChangeText={setCarbs} keyboardType="decimal-pad" />
      <TextField label="Fat" suffix="g" value={fat} onChangeText={setFat} keyboardType="decimal-pad" />

      <Button title="Save" disabled={!isValid} onPress={save} />
    </Screen>
  );
}
