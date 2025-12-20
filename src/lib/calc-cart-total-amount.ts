import { CartItemDTO } from "../../shared/services/dto/cart-dto";

export const calcCartTotalAmount = (item: CartItemDTO) => {
  const ingredientsPrice = item.ingredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );
  return (ingredientsPrice + item.productItem.price) * item.quantity;
};
