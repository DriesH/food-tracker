export type Macros = {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

const KJ_PER_KCAL = 4.184;

export function kcalFromKj(kj: number): number {
  return kj / KJ_PER_KCAL;
}

export function nutritionTotals(per100: Macros, amount: number): Macros {
  const factor = amount / 100;

  return {
    kcal: per100.kcal * factor,
    protein: per100.protein * factor,
    carbs: per100.carbs * factor,
    fat: per100.fat * factor,
  };
}
