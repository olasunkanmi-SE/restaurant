const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: "NGR",
  style: "currency",
});

export function formatCurrency(number: number) {
  return currencyFormatter.format(number);
}
