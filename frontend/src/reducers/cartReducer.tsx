export enum CartActionsType {
  ADD_MENU_TO_CART = "ADD_MENU_TO_CART",
  REMOVE_MENU_FROM_CART = "REMOVE_MENU_FROM_CART",
  UPDATE_PRICE = "UPDATE_PRICE",
  GET_MENU_QUANTITY = "GET_MENU_QUANTITY",
  ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART",
  REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART",
  GET_MENU_PRICE = "GET_MENU_PRICE",
  INCREASE_MENU_QUANTITY = "INCREASE_MENU_QUANTITY",
  GET_ORDER_SUMMARY = "GET_ORDER_SUMMARY",
  RESET_CART = "RESET_CART",
  REMOVE_MENU_FROM_CART_STATE = "REMOVE_MENU_FROM_CART_STATE",
  INCREASE_SELECTED_ITEMS_IN_CART = "INCREASE_SELECTED_ITEMS_IN_CART",
  DECRESE_OR_REMOVE_SELECTED_ITEMS_FROM_CART = "DECRESE_OR_REMOVE_SELECTED_ITEMS_FROM_CART",
  LOAD_CART = "LOAD_CART",
  UPDATE_CART_ITEMS = "UPDATE_CART_ITEMS",
}

export type OrderSummary = {
  id?: string;
  menus: Partial<CartItem & { menuName?: string }>[];
  quantity: number;
};

export type Item = {
  id: string;
  name: string;
  price: number;
  maximumPermitted?: number;
};

export type SelectedItem = {
  menuName?: string;
  id: string;
  menuId: string;
  name: string;
  quantity?: number;
  price: number;
  menuPrice: number;
  notes?: string[];
};

export type CartItem = {
  id: string;
  name: string;
  basePrice: number;
  quantity: number;
  items?: Item[];
  menuPrice: number;
  selectedItems?: SelectedItem[] | [];
  menuTotalPrice: number;
  imageUrl?: string;
};

export type CartAction = {
  type: CartActionsType;
  payload?: cartState;
};

export const initialCartState: cartState = {
  totalPrice: 0,
  quantity: 0,
  menus: [],
  orderSummary: [],
};

export type cartState = {
  totalPrice: number;
  quantity: number;
  menus: Partial<CartItem>[];
  orderSummary: OrderSummary[];
};

export const cartReducer = (state = initialCartState, action: CartAction): cartState => {
  const { type } = action;
  switch (type) {
    case CartActionsType.ADD_MENU_TO_CART:
      return {
        ...state,
      };
    case CartActionsType.REMOVE_MENU_FROM_CART:
      return {
        ...state,
      };
    case CartActionsType.ADD_ITEM_TO_CART:
      return {
        ...state,
      };
    case CartActionsType.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
      };
    case CartActionsType.GET_MENU_QUANTITY:
      return {
        ...state,
      };
    case CartActionsType.GET_MENU_PRICE:
      return {
        ...state,
      };
    case CartActionsType.INCREASE_MENU_QUANTITY:
      return {
        ...state,
      };
    case CartActionsType.GET_ORDER_SUMMARY:
      return {
        ...state,
      };
    case CartActionsType.RESET_CART:
      return {
        ...state,
      };
    case CartActionsType.REMOVE_MENU_FROM_CART_STATE:
      return {
        ...state,
      };
    case CartActionsType.INCREASE_SELECTED_ITEMS_IN_CART:
      return {
        ...state,
      };
    case CartActionsType.DECRESE_OR_REMOVE_SELECTED_ITEMS_FROM_CART:
      return {
        ...state,
      };
    case CartActionsType.UPDATE_CART_ITEMS:
      return {
        ...state,
      };
    case CartActionsType.LOAD_CART:
      return { ...state, ...action.payload };
    default:
      throw new Error(`No case for type ${type} found in shopReducer.`);
  }
};
