import { useLiveQuery } from 'drizzle-orm/expo-sqlite';

import { db } from './client';
import { dailyGoals } from './schema';

type DailyGoalValues = {
  startsOn: string;
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
};

export function useDailyGoals() {
  const { data, updatedAt } = useLiveQuery(db.select().from(dailyGoals));

  return { goals: data, isLoaded: updatedAt !== undefined };
}

// One goal per start date: saving twice on the same day replaces that day's goal.
export async function saveDailyGoal(values: DailyGoalValues) {
  const { startsOn, ...targets } = values;

  await db
    .insert(dailyGoals)
    .values(values)
    .onConflictDoUpdate({ target: dailyGoals.startsOn, set: { ...targets, updatedAt: new Date() } });
}
