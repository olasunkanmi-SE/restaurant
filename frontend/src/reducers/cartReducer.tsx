export enum CartActionsType {
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  UPDATE_PRICE = "UPDATE_PRICE",
  GET_CART_QUANTITY = "GET_CART_QUANTITY",
}

export type Addon = {
  name: string;
  price: number;
};

export type CartItem = {
  id: string;
  name: string;
  basePrice: number;
  quantity: number;
  addons: Addon[];
};

export type CartAction = {
  type: CartActionsType;
  payload: CartItem;
};

export const initialCartState: cartState = {
  totalPrice: 0,
  quantity: 0,
  cart: [],
};

export type cartState = {
  totalPrice: number;
  quantity: number;
  cart: CartItem[];
};

const addToCart = (state: cartState, payload: CartItem): [quantity: number, price: number] => {
  let qty: number = state.quantity;
  let price: number = state.totalPrice;

  if (!state.cart.length) {
    qty = state.quantity + 1;
    price = payload.basePrice;
  }

  if (state.cart.length) {
    state.cart.forEach((item) => (price += item.basePrice));
    qty = state.quantity + 1;
  }
  return [qty, price];
};

export const cartReducer = (state = initialCartState, action: CartAction): cartState => {
  const { type, payload } = action;
  switch (type) {
    case CartActionsType.ADD_TO_CART:
      const [qty, price] = addToCart(state, payload);
      return {
        ...state,
        cart: [...state.cart, payload],
        quantity: qty,
        totalPrice: price,
      };
    case CartActionsType.REMOVE_FROM_CART:
      const filteredItems: CartItem[] = state.cart.filter((item) => item.id !== payload.id);
      let total = 0;
      // let total: number = state.totalPrice - payload.basePrice;
      filteredItems.forEach((item) => (total += item.basePrice));
      return {
        ...state,
        cart: filteredItems,
        quantity: state.quantity - 1,
        totalPrice: total,
      };
    case CartActionsType.UPDATE_PRICE:
      let cartTotal = 0;
      state.cart.length ?? state.cart.forEach((item) => (cartTotal += item.basePrice));
      return {
        ...state,
        totalPrice: cartTotal,
      };
    case CartActionsType.GET_CART_QUANTITY:
      let quantity = state.cart.length ?? state.cart.filter((item) => item.id === payload.id)?.length;
      return {
        ...state,
        quantity: quantity,
      };
    default:
      throw new Error(`No case for type ${type} found in shopReducer.`);
  }
};
