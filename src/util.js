export const currencyFormater = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'usd',
  currencyDisplay: 'narrowSymbol',
  minimumFractionDigits: 0,
});
