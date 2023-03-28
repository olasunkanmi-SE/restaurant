import { useParams } from "react-router-dom";
import { getMenuById } from "../apis";
import { AddToCartButton, StoreItem } from "../components";
import { useShoppingCart } from "../hooks/UseShoppingCart";
import { IItem } from "../models/item.model";
import { Item } from "../reducers";

const mapItems = (items: IItem[]): Item[] => {
  const stateItem =
    items &&
    items.map((item) => {
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
  const { id } = useParams();
  let response;
  if (id) {
    const { isLoading, data: menu } = getMenuById(id);
    const { addToCart, quantity } = useShoppingCart();

    const items = mapItems(menu?.data?.items!);

    if (isLoading) {
      response = <p>...Loading</p>;
    } else {
      if (menu) {
        const { name, description, imageUrl, basePrice } = menu.data;
        return (
          <div>
            <StoreItem
              quantity={quantity}
              items={items}
              name={name}
              description={description}
              imageUrl={imageUrl}
              basePrice={basePrice}
              id={id}
            />
            <AddToCartButton onClick={() => addToCart({ id, name, basePrice, quantity, items })} amount={basePrice} />
          </div>
        );
      }
    }
  }

  return <>{response}</>;
};
