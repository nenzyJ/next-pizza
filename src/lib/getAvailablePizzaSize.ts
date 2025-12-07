import { ProductItem } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../../shared/constants/pizza";
import { Variant } from "@/components/shared/SelectorSizes";

export const getAvailablePizzaSize = (type: PizzaType ,items: ProductItem[]): Variant[] => {
     const filteredPizzaByType = items.filter((item) => item.pizzaType === type);
    
     return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzaByType.some(
          (pizza) => Number(pizza.size) === Number(item.value)
        ),
      }));
}