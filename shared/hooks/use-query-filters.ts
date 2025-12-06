import React from "react";
import { Filters } from "./useFilters";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Мемоізуємо params, щоб вони були стабільні
  const params = React.useMemo(
    () => ({
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    }),
    [
      filters.prices.priceFrom,
      filters.prices.priceTo,
      filters.pizzaTypes,
      filters.sizes,
      filters.selectedIngredients,
    ]
  );

  React.useEffect(() => {
    const newQuery = qs.stringify(params, { arrayFormat: "comma" });

    const currentQuery = searchParams.toString();

    // 2. Якщо query НЕ змінився — нічого не робимо
    if (currentQuery === newQuery) return;

    router.replace(`?${newQuery}`, { scroll: false });
  }, [params]);
};
