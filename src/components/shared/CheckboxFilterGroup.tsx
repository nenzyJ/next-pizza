"use client";
import React from "react";
import { FilterChecboxProps, FilterCheckbox } from "./FilterCheckbox";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

type Item = FilterChecboxProps;

interface CheckboxFilterGroupProps {
  title: string;
  className?: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  selectedIds?: Set<string>;
  name?: string;
}

export const CheckboxFilterGroup: React.FC<CheckboxFilterGroupProps> = ({
  title,
  className,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Search...",
  onClickCheckbox,
  defaultValue,
  loading,
  selectedIds,
  name,
}) => {
  const [showAll, setShowAll] = React.useState<boolean>(false);

  const [searchValue, setSearchValue] = React.useState("");

  const [selectedValues, setSelectedValues] = React.useState<string[]>(
    defaultValue || []
  );

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : (defaultItems || items ).slice(0, limit);

  const onChangeSearchInput = (value: string) => {
    setSearchValue(value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        {Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
          ))}
      </div>
    );
  }
  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

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
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            key={index}
            text={item.text}
            value={item.value}
            checked={selectedIds?.has(item.value)}
            endAdornment={item.endAdornment}
            name={name}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary mt-3 cursor-pointer"
          >
            {showAll ? "Show less" : "Show all"}
          </button>
        </div>
      )}
    </div>
  );
};
