import { portionKindsFor, resolvePortion } from './portion';

const yogurt = { servingSize: 125, packageSize: 500 };

describe('resolvePortion', () => {
  it('uses the amount as grams or ml', () => {
    expect(resolvePortion({ kind: 'amount', value: 250 }, yogurt)).toBe(250);
  });

  it('multiplies Servings by the Serving size', () => {
    expect(resolvePortion({ kind: 'serving', value: 2 }, yogurt)).toBe(250);
  });

  it('multiplies a Package fraction by the Package size', () => {
    expect(resolvePortion({ kind: 'package', value: 0.25 }, yogurt)).toBe(125);
  });

  it('throws for Servings when the Serving size is unknown', () => {
    const looseApples = { servingSize: null, packageSize: null };

    expect(() => resolvePortion({ kind: 'serving', value: 1 }, looseApples)).toThrow();
  });

  it('throws for a Package fraction when the Package size is unknown', () => {
    const looseApples = { servingSize: null, packageSize: null };

    expect(() => resolvePortion({ kind: 'package', value: 0.5 }, looseApples)).toThrow();
  });

  it.each([0, -1])('throws when the value is %d', (value) => {
    expect(() => resolvePortion({ kind: 'amount', value }, yogurt)).toThrow();
  });
});

describe('portionKindsFor', () => {
  it('offers only an amount when no sizes are known', () => {
    expect(portionKindsFor({ servingSize: null, packageSize: null })).toEqual(['amount']);
  });

  it('offers Servings and Package fractions when their sizes are known', () => {
    expect(portionKindsFor(yogurt)).toEqual(['amount', 'serving', 'package']);
  });

  it('offers a Package fraction without Servings when only the Package size is known', () => {
    expect(portionKindsFor({ servingSize: null, packageSize: 400 })).toEqual(['amount', 'package']);
  });
});
