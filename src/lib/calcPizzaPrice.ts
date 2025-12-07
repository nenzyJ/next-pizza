import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../../shared/constants/pizza";

/**
 * 
 * @param type - тип тіста для піци
 * @param size - розмір
 * @param items - список варіацій 
 * @param ingredients - список інгрідієнтів 
 * @param selectedIngredients - обрані інгрідієнти
 * @returns number загальна вартість
 */

export const calcPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};
