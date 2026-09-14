import { kcalFromKj, nutritionTotals } from './nutrition';

describe('nutritionTotals', () => {
  it('scales Nutrition Facts per 100 to the eaten amount', () => {
    const yogurtPer100 = { kcal: 60, protein: 4, carbs: 5, fat: 3 };

    expect(nutritionTotals(yogurtPer100, 250)).toEqual({ kcal: 150, protein: 10, carbs: 12.5, fat: 7.5 });
  });
});

describe('kcalFromKj', () => {
  it('converts kJ to kcal', () => {
    expect(kcalFromKj(1674)).toBeCloseTo(400.1, 1);
  });
});
