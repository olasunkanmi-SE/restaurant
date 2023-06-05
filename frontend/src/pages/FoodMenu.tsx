import { useParams } from "react-router-dom";
import { getMenuById } from "../apis";
import { useShoppingCart } from "../hooks/UseShoppingCart";
import { IItem } from "../models/item.model";
import { Item } from "../reducers";
import { StoreItem } from "../components/MenuItems/StoreItem";
import { AddMenuToCartButton } from "../components/Cart/AddMenuToCart";
import { useEffect, useState } from "react";
import { CartItemsList } from "../components/Cart";
import { IMenuData } from "../models/menu.model";

const mapItems = (items: IItem[]): Item[] => {
  const stateItem = items?.map((item) => {
    const { id, name, price, maximumPermitted } = item;
    return {
      id,
      name,
      price,
      maximumPermitted,
    };
  });
  return stateItem;
};

export const FoodMenu = () => {
  const {
    increaseMenuQuantity,
    quantity,
    totalPrice,
    removeMenuFromCart,
    getMenuQuantity,
    removeMenuFromState,
    addMenuToCart,
  } = useShoppingCart();
  const [disableAddToCartBtns, setDisableAddToCartBtns] = useState<boolean>(false);

  useEffect(() => {
    setDisableAddToCartBtns(true);
    return () => {
      setDisableAddToCartBtns(false);
    };
  }, []);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(true);
    setDisableAddToCartBtns(false);
    if (id) {
      removeMenuFromState(id);
    }
    handleUnCheck();
  };

  const handleAddToCart = () => {
    if (response) {
      addMenuToCart(response);
    }
  };

  const handleSetDisableAddToCartBtns = () => {
    setDisableAddToCartBtns(false);
  };

  const handleUnCheck = () => {
    if (isChecked) {
      setIsChecked(!isChecked);
      setDisableAddToCartBtns(true);
    }
  };

  const { id } = useParams();
  let response: IMenuData | undefined;
  if (id) {
    const { isLoading, data: menu } = getMenuById(id);
    const items = mapItems(menu?.data?.items!);
    response = menu?.data;
    if (isLoading) {
      return (
        <>
          <p>...Loading</p>
        </>
      );
    } else {
      if (menu) {
        const { name, description, imageUrl, basePrice } = menu.data;
        return (
          <div>
            <StoreItem
              enableAddToCartBtns={handleSetDisableAddToCartBtns}
              handleUnCheck={handleUnCheck}
              isChecked={isChecked}
              handleCheck={handleCheck}
              quantity={quantity}
              items={items}
              name={name}
              description={description}
              imageUrl={imageUrl}
              basePrice={basePrice}
              id={id}
            />
            <div className="elBg addToCart">
              <div className=" pt-2 pb-2">
                <CartItemsList id={id} />
              </div>
              <AddMenuToCartButton
                basePrice={basePrice}
                id={id}
                quantity={getMenuQuantity(id)}
                handleInCreaseQty={() => increaseMenuQuantity({ id, name, basePrice, quantity, items })}
                onAddMenuToCart={() => increaseMenuQuantity({ id, name, basePrice, quantity, items })}
                amount={totalPrice > 0 ? totalPrice : basePrice}
                onRemoveMenuFromCart={() => removeMenuFromCart({ id, name, basePrice, quantity, items })}
                disableQuatityButton={disableAddToCartBtns}
                disableAddToCartButton={disableAddToCartBtns}
                addToCart={handleAddToCart}
              />
            </div>
          </div>
        );
      }
    }
  }
  return <>{response}</>;
};
