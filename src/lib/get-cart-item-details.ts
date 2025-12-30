import { Ingredient } from "@prisma/client";
import {
  mapPizzaType,
  PizzaSize,
  PizzaType,
} from "../../shared/constants/pizza";
import { StateCartItem } from "./get-cart-details";

export const getCartItemDetails = (
  ingredients: StateCartItem["ingredients"],
  pizzaType?: PizzaType,
  pizzaSize?: PizzaSize,
  
) => {
  const details = [];
  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} sm`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(", ");
};
