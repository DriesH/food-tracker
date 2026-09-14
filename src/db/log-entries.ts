import { asc, eq } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';

import { db } from './client';
import { logEntries, type Meal } from './schema';

type QuickEntryValues = {
  name: string;
  kcal: number;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
};

export function useDayEntries(date: string) {
  const { data } = useLiveQuery(
    db.select().from(logEntries).where(eq(logEntries.date, date)).orderBy(asc(logEntries.createdAt)),
    [date],
  );

  return data;
}

export function useLogEntry(id: number | null) {
  const { data } = useLiveQuery(db.select().from(logEntries).where(eq(logEntries.id, id ?? -1)), [id]);

  return data[0] ?? null;
}

export async function addQuickEntry(date: string, meal: Meal, values: QuickEntryValues) {
  await db.insert(logEntries).values({ date, meal, ...values });
}

export async function updateQuickEntry(id: number, values: QuickEntryValues) {
  await db.update(logEntries).set(values).where(eq(logEntries.id, id));
}

export async function deleteLogEntry(id: number) {
  await db.delete(logEntries).where(eq(logEntries.id, id));
}
