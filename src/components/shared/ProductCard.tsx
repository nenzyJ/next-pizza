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
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
        <p className="text-sm text-gray-400">
          {ingredients.map((ingredient) => ingredient.name).join(", ")}{" "}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-[20px]">
            from <b>{price}$</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Add
          </Button>
        </div>
      </Link>
    </div>
  );
};
