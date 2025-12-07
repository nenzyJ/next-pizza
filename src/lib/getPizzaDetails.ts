import { Ingredient, ProductItem } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../../shared/constants/pizza";
import { calcPizzaPrice } from "./calcPizzaPrice";

export const getPizzaDetails = (
    type: PizzaType,
    size: PizzaSize, 
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>,
) => {
    const totalPrice = calcPizzaPrice(
    type, size, items, ingredients ,selectedIngredients, 
  );
  const textDetaills = `${size} sm, ${mapPizzaType[type]} pizza`;

  return {totalPrice, textDetaills}
}