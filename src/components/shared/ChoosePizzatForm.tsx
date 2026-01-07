'use client'

import { Ingredient, ProductItem } from "@prisma/client";
import { Button } from "../ui/button";
import { Title } from "./Title";
import { ProductImage } from "./ProductImage";
import { cn } from "@/lib/utils";
import { SelectorSizes } from "./SelectorSizes";
import {
  PizzaSize,
  PizzaType,
  pizzaTypes,
} from "../../../shared/constants/pizza";
import React from "react";
import { IngredientList } from "./IngredientList";
import { usePizzaOptions } from "@/lib/usePizzaOptions";
import { getPizzaDetails } from "@/lib/getPizzaDetails";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[]; // ProductItem[]
  loading?: boolean;
  className?: string;
  onSubmit: (itemId: number, ingredients: number[]) => void;
}
export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  imageUrl,
  ingredients,
  onSubmit,
  className,
  items,
  loading,
}) => {
  
  const {size, type, selectedIngredients, availableSizes, currentItemId ,setSize, setType, addIngredient} = usePizzaOptions(items);

  //TODOD
  const {totalPrice, textDetaills} = getPizzaDetails(type, size, items ,ingredients,selectedIngredients,);

  const handleClickAdd = () => {
    if(currentItemId){
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn(className, "flex flex-1")}>
      <ProductImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetaills}</p>
        <div className="flex flex-col gap-3 mt-5">
          <SelectorSizes
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <SelectorSizes
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientList
                key={ingredient.id}
                name={ingredient.name}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                price={ingredient.price}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Add to cart for {totalPrice} $
        </Button>
      </div>
    </div>
  );
};
