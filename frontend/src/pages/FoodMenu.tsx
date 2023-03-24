import { Fragment } from "react";
import { StoreItem } from "../components";
import { useParams } from "react-router-dom";
import { IItem } from "../models/item.model";
import { getMenuById } from "../apis";

export const FoodMenu = () => {
  const { id } = useParams();
  let items: IItem[] = [];
  if (id) {
    const { isLoading, data: menu } = getMenuById(id);
    let response;
    if (isLoading) {
      response = <p>...Loading</p>;
    } else {
      response = menu?.data;
    }
    items = menu?.data.items || [];
  }

  return (
    <Fragment>
      <StoreItem
        name="Jollof Rice and fish"
        description="This is a tradition west african food"
        imageUrl="https://i0.wp.com/travelandmunchies.com/wp-content/uploads/2022/11/IMG_8133-scaled.jpg?fit=2560%2C1828&ssl=1"
        basePrice={5}
      />
    </Fragment>
  );
};
