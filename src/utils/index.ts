export const toCurrency = (num: number): string => {
  return "$" + num.toLocaleString(undefined, { minimumFractionDigits: 2 });
};

export const toLocalString = (num: number): string => {
  return "" + num.toLocaleString(undefined);
};
