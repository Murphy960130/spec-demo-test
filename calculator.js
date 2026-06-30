function isNumericString(x) {
  return typeof x === 'string' && /^-?\d+$/.test(x);
}

export function add(a, b) {
  const aIsNum = typeof a === 'number';
  const bIsNum = typeof b === 'number';
  const aIsStr = isNumericString(a);
  const bIsStr = isNumericString(b);

  if (aIsNum && bIsNum) return a + b;
  if (aIsStr && bIsStr) return Number(a) + Number(b);
  return NaN;
}
