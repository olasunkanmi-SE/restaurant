import { useShoppingCart } from "../hooks/UseShoppingCart";

const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: "NGR",
  style: "currency",
});

export function formatCurrency(number: number) {
  return currencyFormatter.format(number);
}

export const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const calculateQuantity = (quantity: number) => {
  const { GetOrderSummary } = useShoppingCart();
  const orderSummary = GetOrderSummary();
  let orderQty = orderSummary.reduce((acc, order) => acc + order.quantity, 0);
  let orderQuantity = orderQty || 0;

  if ((quantity === 0 && orderSummary.length) || (quantity !== 0 && orderSummary.length)) {
    return orderQuantity;
  }
  return orderQuantity;
};
