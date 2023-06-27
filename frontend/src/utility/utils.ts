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
  if (encrypt) {
    try {
      const encryptedText = cryptoJs.AES.encrypt(value, import.meta.env.VITE_SECRET);
      if (encryptedText) {
        localStorage.setItem(key, encryptedText.toString());
      }
    } catch (error) {
      console.log("Error while saving user Data", error);
    }
  } else {
    localStorage.setItem(key, value);
  }
};

export const getLocalStorageData = (key: string, decrypt: boolean) => {
  let value = localStorage.getItem(key);
  if (value && decrypt) {
    try {
      const decryptedText = cryptoJs.AES.decrypt(value, import.meta.env.VITE_SECRET);
      return decryptedText.toString(cryptoJs.enc.Utf8);
    } catch (error) {
      console.log("Error while getting user data", error);
    }
  }
  return value;
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
