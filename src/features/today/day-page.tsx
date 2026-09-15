import { View } from 'react-native';

import { useDayEntries } from '@/db/log-entries';
import { meals, type DailyGoal } from '@/db/schema';
import { dailyGoalFor } from '@/domain/daily-goal';
import { dayProgress } from '@/domain/day-progress';
import { Screen } from '@/ui/components/screen';

import { DayProgressCard } from './day-progress-card';
import { MealSection } from './meal-section';

type DayPageProps = {
  date: string;
  goals: DailyGoal[];
  width: number;
};

export function DayPage({ date, goals, width }: DayPageProps) {
  const entries = useDayEntries(date);
  const goal = dailyGoalFor(date, goals);
  const progress = dayProgress(entries, goal);

  return (
    <View style={{ width }}>
      <Screen directionalLockEnabled>
        <DayProgressCard progress={progress} goal={goal} />
        {meals.map((meal) => (
          <MealSection key={meal} date={date} meal={meal} entries={entries.filter((entry) => entry.meal === meal)} />
        ))}
      </Screen>
    </View>
  );
}
