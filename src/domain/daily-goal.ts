// Dates are ISO `YYYY-MM-DD` strings, so string order is date order.
export function dailyGoalFor<Goal extends { startsOn: string }>(date: string, goals: Goal[]): Goal | null {
  let match: Goal | null = null;

  for (const goal of goals) {
    if (goal.startsOn <= date && (match === null || goal.startsOn > match.startsOn)) {
      match = goal;
    }
  }

  return match;
}
