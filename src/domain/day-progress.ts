import type { Macros } from './nutrition';

type EntryTotals = {
  kcal: number;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
};

type GoalTargets = {
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
};

export function dayProgress(entries: EntryTotals[], goal: GoalTargets | null) {
  const consumed: Macros = { kcal: 0, protein: 0, carbs: 0, fat: 0 };

  for (const entry of entries) {
    consumed.kcal += entry.kcal;
    consumed.protein += entry.protein ?? 0;
    consumed.carbs += entry.carbs ?? 0;
    consumed.fat += entry.fat ?? 0;
  }

  const remaining: Macros | null = goal && {
    kcal: goal.kcal - consumed.kcal,
    protein: goal.proteinG - consumed.protein,
    carbs: goal.carbsG - consumed.carbs,
    fat: goal.fatG - consumed.fat,
  };

  return { consumed, remaining };
}
