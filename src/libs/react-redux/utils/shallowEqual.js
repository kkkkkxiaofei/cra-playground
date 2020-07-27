export default (A, B) => {
  if (typeof A !== 'object' || typeof B !== 'object') {
    return false;
  }

  const keysA = Object.keys(A);
  const keysB = Object.keys(B);

  if (keysA.length !== keysB.length) {
    return false;
  }

  keysA.forEach(keyA => {
    if (keysA[keyA] !== keysB[keyA]) {
      return false;
    }
  })

  return true;
}