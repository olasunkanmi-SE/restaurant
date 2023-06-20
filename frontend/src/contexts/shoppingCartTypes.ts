import { IMenuData } from "../models/menu.model";
import { CartItem, OrderSummary, selectedItem } from "../reducers";

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
  AddItemToCart(menuItem?: selectedItem): void;
  removeItemFromCart(menuItem: selectedItem): void;
  getMenuQuantity(id: string): number;
  calculateMenuTotalPriceFromMenuItems(id: string): number | undefined;
  itemPrice(id: string): number | undefined;
  AddMoreMenu(id: string): number | undefined;
  addMenuToCart(menu: IMenuData): void;
  GetOrderSummary(): OrderSummary[] | undefined;
  resetCart(): void;
  getMenus(): Partial<CartItem>[];
  removeMenuFromState(id: string): void;
  GetTotalPrice: () => number;
  IncreaseShoppingCartSelectedItem: (selectedItem: selectedItem, increase: boolean) => void;
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
  upgradeOrderItem: (itemId: string, type: upgradeOrder, order?: OrderSummary) => void;
  calculateUpgradeOrderPrice: (menuQuantity: number, menuBasePrice: number, selectedItems: selectedItem[]) => number;
};
