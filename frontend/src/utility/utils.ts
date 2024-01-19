import { useShoppingCart } from "../hooks/UseShoppingCart";
import cryptoJs from "crypto-js";
import _ from "lodash";

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

export const calculateQuantity = () => {
  const { GetOrderSummary } = useShoppingCart();
  const orderSummary = GetOrderSummary();
  let orderQty = orderSummary?.length ? orderSummary.reduce((acc, order) => acc + order.quantity, 0) : 0;
  let orderQuantity = orderQty || 0;
  return orderQuantity;
};

export const calculateTotalOrderAmount = (): number => {
  const { GetOrderSummary } = useShoppingCart();
  const orderSummary = GetOrderSummary();
  const total = orderSummary?.length ? orderSummary.reduce((acc, order) => acc + order.menus[0].menuTotalPrice!, 0) : 0;
  return total > 0 ? total : 0;
};

export const setLocalStorageData = (key: string, value: string, encrypt: boolean) => {
  try {
    if (encrypt) {
      const encryptedText = cryptoJs.AES.encrypt(value, import.meta.env.VITE_SECRET);
      if (encryptedText) {
        localStorage.setItem(key, encryptedText.toString());
      }
    } else {
      localStorage.setItem(key, value);
    }
  } catch (error) {
    console.log("Error while saving user Data", error);
  }
};

export const getLocalStorageData = (key: string, decrypt: boolean) => {
  try {
    let value = localStorage.getItem(key);
    if (value && decrypt) {
      const decryptedText = cryptoJs.AES.decrypt(value, import.meta.env.VITE_SECRET);
      return decryptedText.toString(cryptoJs.enc.Utf8);
    }
    return value;
  } catch (error) {
    console.log("Error while getting user data", error);
  }
};

export const clearStorage = () => {
  localStorage.clear();
};

export const wordWrap = (text: string, wordLimit: number) => {
  return _.truncate(text, {
    length: wordLimit,
    omission: "...",
  });
};

export const calculateServiceCharge = (amount: number) => {
  return Math.floor(Math.round(amount / 10));
};

export const cartExpiry = (date: string): boolean => {
  const specifiedDate: Date = new Date(date);
  const timeDifferenceMs: number = new Date().getTime() - specifiedDate.getTime();
  const hoursDifference: number = timeDifferenceMs / (1000 * 60 * 60);
  return hoursDifference > 1;
};
