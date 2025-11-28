"use client";
import React from "react";
import { Title } from "./Title";
import { FilterCheckbox } from "./FilterCheckbox";
import { Input } from "../ui/input";
import { RangeSlider } from "./RangeSlider";
import { CheckboxFilterGroup } from "./CheckboxFilterGroup";
import { useFilterIngredients } from "../../../hooks/useIFilterIngredients";
interface FiltersProps {
  className?: string;
}

export const Filters: React.FC<FiltersProps> = ({ className }) => {
  const { ingredients, loading } = useFilterIngredients();

  const items = ingredients.map((items) => ({
    value: String(items.id),
    text: items.name,
  }));
  return (
    <div className={className}>
      <Title text="Filter" size="sm" className="mb-5 font-bold"></Title>
      {/* checkbox */}
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Can gather" value="1" />
        <FilterCheckbox text="New items" value="2" />
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
            defaultValue={0}
          />
          <Input type="number" min={100} max={1000} placeholder="1000" />
        </div>

        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
      </div>

      <CheckboxFilterGroup
        title="ingredients"
        className="mt-5"
        limit={5}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
      />
    </div>
  );
};
