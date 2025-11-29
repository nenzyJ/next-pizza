import { useRouter, useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    selectedIngredients: Set<string>;
    prices: PriceProps;
}

interface ReturnProps extends Filters {
    setPrice: (name: keyof PriceProps, value: number) => void;
    setPizzaTypes: (value: string) => void;
    setSizes: (value: string) => void;
    setIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const router = useRouter();

  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  );

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );

  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.has("pizzaTypes")
        ? searchParams.get("pizzaTypes")?.split(",")
        : []
    )
  );

  const [prices, setPrice] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

    const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice( prev=> ({
      ...prev,
      [name]: value,
    }));
  };

//   const filters = {
//   ...prices,
//   pizzaTypes: Array.from(pizzaTypes),
//   sizes: Array.from(sizes),
//   ingredients: Array.from(selectedIngredients)
// };

  return {
    sizes,
    pizzaTypes,
    selectedIngredients,
    prices,
    setPrice: updatePrice, 
    setPizzaTypes: togglePizzaTypes,
    setSizes: toggleSizes,
    setIngredients: toggleIngredients,
  }
};
