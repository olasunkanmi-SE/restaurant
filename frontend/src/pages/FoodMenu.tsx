import { StoreItem } from "../components";
import { useParams } from "react-router-dom";
import { getMenuById } from "../apis";

export const FoodMenu = () => {
  const { id } = useParams();
  let response;
  if (id) {
    const { isLoading, data: menu } = getMenuById(id);
    if (isLoading) {
      response = <p>...Loading</p>;
    } else {
      const { name, description, items, imageUrl, basePrice } = menu?.data!;
      return (
        <StoreItem items={items} name={name} description={description} imageUrl={imageUrl} basePrice={basePrice} />
      );
    }
  }

  return <>{response}</>;
};
