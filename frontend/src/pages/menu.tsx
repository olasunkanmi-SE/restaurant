import { Fragment } from "react";
import { StoreItem } from "../components";

export const Menu = () => {
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
