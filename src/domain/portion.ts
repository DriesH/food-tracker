export type Portion = {
  kind: 'amount' | 'serving' | 'package';
  value: number;
};

type PortionSizes = {
  servingSize: number | null;
  packageSize: number | null;
};

export function portionKindsFor(sizes: PortionSizes): Portion['kind'][] {
  const kinds: Portion['kind'][] = ['amount'];

  if (sizes.servingSize !== null) {
    kinds.push('serving');
  }

  if (sizes.packageSize !== null) {
    kinds.push('package');
  }

  return kinds;
}

export function resolvePortion(portion: Portion, sizes: PortionSizes): number {
  if (portion.value <= 0) {
    throw new Error('A Portion must be greater than zero');
  }

  if (portion.kind === 'serving') {
    if (sizes.servingSize === null) {
      throw new Error('Cannot resolve Servings without a Serving size');
    }

    return portion.value * sizes.servingSize;
  }

  if (portion.kind === 'package') {
    if (sizes.packageSize === null) {
      throw new Error('Cannot resolve a Package fraction without a Package size');
    }

    return portion.value * sizes.packageSize;
  }

  return portion.value;
}
