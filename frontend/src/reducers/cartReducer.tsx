export enum CartActionsType {
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  UPDATE_PRICE = "UPDATE_PRICE",
  GET_MENU_QUANTITY = "GET_MENU_QUANTITY",
  ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART",
  REMOVE_ITEM_TO_CART = "REMOVE_ITEM_TO_CART",
}

export type Item = {
  id: string;
  name: string;
  price: number;
  maximumPermitted?: number;
};

export type selectedItem = {
  id: string;
  menuId: string;
  name: string;
  quantity?: number | 0;
  total?: number;
  price: number;
  menuPrice: number;
};

export type CartItem = {
  id: string;
  name: string;
  basePrice: number;
  quantity: number;
  items?: Item[];
  selectedItems?: selectedItem[];
};

export type CartAction = {
  type: CartActionsType;
};

export const initialCartState: cartState = {
  totalPrice: 0,
  quantity: 0,
  menus: [],
  items: [],
};

export type cartState = {
  totalPrice: number;
  quantity: number;
  menus: Partial<CartItem>[];
  items: Item[] | undefined;
};

export const cartReducer = (state = initialCartState, action: CartAction): cartState => {
  const { type } = action;
  switch (type) {
    case CartActionsType.ADD_TO_CART:
      return {
        ...state,
      };
    case CartActionsType.REMOVE_FROM_CART:
      return {
        ...state,
      };
    // case CartActionsType.GET_MENU_QUANTITY:
    //   let quantity = state.menus.length ?? state.menus.filter((item) => item.id === menuPayload!.id)?.length;
    //   return {
    //     ...state,
    //     quantity: quantity,
    //   };
    case CartActionsType.ADD_ITEM_TO_CART:
      return {
        ...state,
      };
    default:
      throw new Error(`No case for type ${type} found in shopReducer.`);
  }
};
