import { dailyGoalFor } from './daily-goal';

const goals = [
  { startsOn: '2026-09-14', kcal: 2000 },
  { startsOn: '2026-09-01', kcal: 2200 },
];

describe('dailyGoalFor', () => {
  it('uses the goal that started most recently before the date', () => {
    expect(dailyGoalFor('2026-09-10', goals)?.kcal).toBe(2200);
  });

  it('applies a goal from the day it starts', () => {
    expect(dailyGoalFor('2026-09-14', goals)?.kcal).toBe(2000);
  });

  it('has no goal before the first goal starts', () => {
    expect(dailyGoalFor('2026-08-31', goals)).toBeNull();
  });
});
