"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useClickAway, useDebounce } from "react-use";
import { Api } from "../../../shared/services/api-client";
import { Product } from "@prisma/client";
interface HInputProps {
  className?: string;
}

export const HInput: React.FC<HInputProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const [products, setProducts] = React.useState<Product[]>([]);

  useClickAway(ref, () => {
    setFocused(false);
  });
  useDebounce(
    async () => {
      try {
        const response = await Api.products.search(searchQuery);
        setProducts(response);
      } catch (error) {
        console.log(error);
      }
    },
    100,
    [searchQuery]
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery("");
    setProducts([]);
  };

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
      )}
      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
          className
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Search products..."
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
              focused && "visible opacity-100 top-12"
            )}
          >
            {products.map((product) => (
              <Link
                onClick={onClickItem}
                key={product.id}
                href={`/product/${product.id}`}
                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10 cursor-pointer"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="rounded-sm h-8 w-8"
                />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
