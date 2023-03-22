export enum CartActionsType {
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  UPDATE_PRICE = "UPDATE_PRICE",
  GET_ITEM_QUANTITY = "GET_ITEM_QUANTITY",
}

export type Addon = {
  id: string;
  name: string;
  price: number;
};

export type Item = {
  id: string;
  name: string;
  price: number;
  maximumPermitted: number;
  addons: Addon[];
};

export type CartItem = {
  id: string;
  name: string;
  basePrice: number;
  quantity: number;
  items?: Item[];
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

export const cartReducer = (state = initialCartState, action: CartAction): cartState => {
  const { type, payload } = action;
  switch (type) {
    case CartActionsType.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, payload],
      };
    case CartActionsType.REMOVE_FROM_CART:
      return {
        ...state,
      };
    case CartActionsType.GET_ITEM_QUANTITY:
      let quantity = state.cart.length ?? state.cart.filter((item) => item.id === payload.id)?.length;
      return {
        ...state,
        quantity: quantity,
      };
    default:
      throw new Error(`No case for type ${type} found in shopReducer.`);
  }
};
