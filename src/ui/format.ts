export function formatKcal(kcal: number): string {
  return String(Math.round(kcal));
}

export function formatGrams(grams: number): string {
  return String(Math.round(grams * 10) / 10);
}

// Accepts a decimal comma, as typed on a Belgian keyboard.
export function parseDecimal(input: string): number | null {
  const normalized = input.trim().replace(',', '.');

  if (normalized === '') {
    return null;
  }

  const value = Number(normalized);

  return Number.isFinite(value) ? value : null;
}

export function isValidOptionalAmount(input: string): boolean {
  if (input.trim() === '') {
    return true;
  }

  const value = parseDecimal(input);

  return value !== null && value >= 0;
}
