import { dayProgress } from './day-progress';

const goal = { kcal: 2000, proteinG: 150, carbsG: 200, fatG: 70 };

const breakfast = { kcal: 500, protein: 30, carbs: 50, fat: 20 };
const restaurantPasta = { kcal: 300, protein: null, carbs: null, fat: null };

describe('dayProgress', () => {
  it('adds up Log Entries and subtracts them from the Daily Goal', () => {
    expect(dayProgress([breakfast, restaurantPasta], goal)).toEqual({
      consumed: { kcal: 800, protein: 30, carbs: 50, fat: 20 },
      remaining: { kcal: 1200, protein: 120, carbs: 150, fat: 50 },
    });
  });

  it('shows a negative remainder when the Daily Goal is exceeded', () => {
    const feast = { kcal: 2300, protein: 100, carbs: 250, fat: 90 };

    expect(dayProgress([feast], goal).remaining).toEqual({ kcal: -300, protein: 50, carbs: -50, fat: -20 });
  });

  it('has nothing remaining when there is no Daily Goal', () => {
    expect(dayProgress([breakfast], null).remaining).toBeNull();
  });
});
