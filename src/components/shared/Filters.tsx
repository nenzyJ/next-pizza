"use client";
import React from "react";
import { Title } from "./Title";
import { FilterCheckbox } from "./FilterCheckbox";
import { Input } from "../ui/input";
import { RangeSlider } from "./RangeSlider";
import { CheckboxFilterGroup } from "./CheckboxFilterGroup";
import { useSet } from "react-use";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";
import { useIngredients } from "../../../shared/hooks/use-ingredints";
import { useFilters } from "../../../shared/hooks/useFilters";
import { useQueryFilters } from "../../../shared/hooks/use-query-filters";

interface FiltersProps {
  className?: string;
}

export const Filters: React.FC<FiltersProps> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();
  const router = useRouter();

  useQueryFilters(filters);

  const items = ingredients.map((items) => ({
    value: String(items.id),
    text: items.name,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrice("priceFrom", prices[0]);
    filters.setPrice("priceTo", prices[1]);
  };

  //   const updatePrice = (name: keyof PriceProps, value: number) => {
  //     setPrice({
  //       ...prices,
  //       [name]: value,
  //     });
  //   };

  //   const filters = React.useMemo(() => ({
  //   ...prices,
  //   pizzaTypes: Array.from(pizzaTypes),
  //   sizes: Array.from(sizes),
  //   ingredients: Array.from(selectedIds)
  // }), [prices, pizzaTypes, sizes, selectedIds]);

  return (
    <div className={className}>
      <Title text="Filter" size="sm" className="mb-5 font-bold"></Title>
      {/* checkbox */}
      <div className="flex flex-col gap-4">
        {/* upper checkbox */}
        <CheckboxFilterGroup
          name="sizes"
          className="mb-5"
          selectedIds={filters.pizzaTypes}
          title="Sizes"
          onClickCheckbox={filters.setPizzaTypes}
          items={[
            { text: "Slim", value: "1" },
            { text: "Default", value: "2" },
          ]}
        />

        <CheckboxFilterGroup
          name="sizes"
          className="mb-5"
          selectedIds={filters.sizes}
          title="Sizes"
          onClickCheckbox={filters.setSizes}
          items={[
            { text: "20 sm", value: "20" },
            { text: "30 sm", value: "30" },
            { text: "40 sm", value: "40" },
          ]}
        />
      </div>
      {/* price filter */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price from and to: </p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) =>
              filters.setPrice("priceFrom", Number(e.target.value))
            }
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            value={String(filters.prices.priceTo)}
            onChange={(e) =>
              filters.setPrice("priceTo", Number(e.target.value))
            }
          />
        </div>

        <RangeSlider
          className="cursor-pointer"
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
          onValueChange={updatePrices}
        />
      </div>

      <CheckboxFilterGroup
        title="ingredients"
        className="mt-5"
        limit={5}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setIngredients}
        selectedIds={filters.selectedIngredients}
        name="ingredients"
      />
    </div>
  );
};
