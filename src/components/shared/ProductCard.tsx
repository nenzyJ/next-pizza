import Link from "next/link";
import React from "react";
import { Title } from "./Title";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Ingredient } from "@prisma/client";
interface ProductCardProps {
  className?: string;
  id: number;
  name: string;
  imageUrl: string;
  ingredients: Ingredient[];
  price: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  price,
  imageUrl,
  name,
  className,
  ingredients,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`} scroll={false}>
        <div className="flex justify-center p-4 md:p-6 bg-secondary rounded-lg h-[200px] md:h-[260px]">
          <img className="w-[160px] h-[160px] md:w-[215px] md:h-[215px] object-contain" src={imageUrl} alt={name} />
        </div>
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
        <p className="text-xs md:text-sm text-gray-400 line-clamp-2">
          {ingredients.map((ingredient) => ingredient.name).join(", ")}{" "}
        </p>

        <div className="flex items-center justify-between mt-3 md:mt-4">
          <span className="text-lg md:text-[20px]">
            from <b>{price}$</b>
          </span>

          <Button variant="secondary" className="text-sm md:text-base font-bold h-10 md:h-auto">
            <Plus size={18} className="md:size-5" />
            <span className="hidden sm:inline ml-1">Add</span>
          </Button>
        </div>
      </Link>
    </div>
  );
};
