import { useLocalSearchParams } from 'expo-router';

import type { Meal } from '@/db/schema';
import { QuickEntryForm } from '@/features/today/quick-entry-form';

export default function QuickEntryScreen() {
  const { id, date, meal } = useLocalSearchParams<{ id?: string; date?: string; meal?: Meal }>();

  return <QuickEntryForm id={id ? Number(id) : null} date={date} meal={meal} />;
}
