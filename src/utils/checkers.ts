export const isNonZero = (arr: number[]) => {
  let isNotZero = false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      isNotZero = true;
      break;
    }
  }
  return isNotZero;
};
