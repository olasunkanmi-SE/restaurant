import { IMenuData } from "../models/menu.model";
import { CartItem, OrderSummary, SelectedItem } from "../reducers";

export type shoppingCartProviderProps = {
  children: React.ReactNode;
};

export type upgradeOrder = "Increase" | "Decrease";

export type shoppingCartProps = {
  totalPrice: number;
  menus: Partial<CartItem>[];
  quantity: number;
  openCart(): void;
  closeCart(): void;
  increaseMenuQuantity(payload: Partial<CartItem>): void;
  removeMenuFromCart(cartItem: Partial<CartItem>): void;
  AddItemToCart(menuItem?: SelectedItem): void;
  removeItemFromCart(menuItem: SelectedItem): void;
  getMenuQuantity(id: string): number;
  calculateMenuTotalPriceFromMenuItems(id: string): number | undefined;
  itemPrice(id: string): number | undefined;
  AddMoreMenu(id: string): number | undefined;
  addMenuToCart(menu: IMenuData, instructions?: string): void;
  GetOrderSummary(): OrderSummary[] | undefined;
  resetCart(): void;
  getMenus(): Partial<CartItem>[];
  removeMenuFromState(id: string): void;
  GetTotalPrice: () => number;
  IncreaseShoppingCartSelectedItem: (selectedItem: SelectedItem, increase: boolean) => void;
  updateCartItems: (orderSummary: OrderSummary[]) => void;
  RecreateStateFromMenu: (orderMenus: Partial<CartItem>[]) => void;
  UpdateMenuImageURL: (
    menus: Partial<
      CartItem & {
        menuName: string | undefined;
      }
    >[],
    menu: IMenuData
  ) => void;
  addSelectedItemInstruction: (selectedItem: SelectedItem, instruction: string) => void;
  resetMenu: () => void;
};
