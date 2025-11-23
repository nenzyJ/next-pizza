"use client";
import React from "react";
import { FilterChecboxProps, FilterCheckbox } from "./FilterCheckbox";
import { Input } from "../ui/input";

type Item = FilterChecboxProps;

interface CheckboxFilterGroupProps {
  title: string;
  className?: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (values: string[]) => void;
  defaultValue?: string[];
}

export const CheckboxFilterGroup: React.FC<CheckboxFilterGroupProps> = ({
  title,
  className,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Search...",
  onChange,
  defaultValue,
}) => {
  const [showAll, setShowAll] = React.useState<boolean>(false);

  const [searchValue, setSearchValue] = React.useState("");

  const list = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())) : defaultItems.slice(0, limit);

  const onChangeSearchInput = (value: string) => {
    setSearchValue(value);
  }
  return (
    <div className={className}>
      <p className=""></p>

      {showAll && (
        <div className="mb-5">
          <Input
            onChange={(e) => onChangeSearchInput(e.target.value)}
            type="text"
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            onCheckedChange={() => onCheckedChange(item.value)}
            key={index}
            text={item.text}
            value={item.value}
            checked={false}
            endAdornment={item.endAdornment}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={()=> setShowAll(!showAll)} className="text-primary mt-3 cursor-pointer">
            {showAll ? 'Show less' : 'Show all'}
          </button>
        </div>
      )}
    </div>
  );
};
