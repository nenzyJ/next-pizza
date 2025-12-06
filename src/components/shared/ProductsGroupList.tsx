"use client";
import React from "react";
import { useIntersection } from "react-use";
import { Title } from "./Title";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";
import { useCategoryStore } from "../../../shared/store/category";

interface ProductsGroupListProps {
  title: string;
  className?: string;
  listClassName?: string;
  categoryId: number;
  products: any[];
}

export const ProductsGroupList: React.FC<ProductsGroupListProps> = ({
  title,
  products,
  listClassName,
  categoryId,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef<HTMLDivElement>(null);
  const intersection = useIntersection(
    intersectionRef as React.RefObject<HTMLElement>,
    {
      threshold: 0.5,
    }
  );

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, setActiveCategoryId]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn("grid grid-cols-3 gap-[50px] ", listClassName)}>
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
