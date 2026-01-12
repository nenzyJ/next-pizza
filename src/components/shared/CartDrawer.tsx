"use client";
import React, { Children } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./CartDrawerItem";
import { useCartStore } from "../../../shared/store/cart";
import { PizzaSize, PizzaType } from "../../../shared/constants/pizza";
import { getCartItemDetails } from "@/lib/get-cart-item-details";
import { Ingredient } from "@prisma/client";
// 👇 1. Імпорт useShallow для виправлення помилки Infinite Loop
import { useShallow } from "zustand/react/shallow";
import Image from "next/image";
import { Title } from "./Title";
import { cn } from "@/lib/utils";
import { useCart } from "../../../shared/hooks/use-cart";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  // 👇 2. Обгортаємо селектор у useShallow
  const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();

  const onClickCountButton = (
    id: string,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    if (newQuantity < 1) {
      return; //
    }

    console.log("CartDrawer - id:", id, "newQuantity:", newQuantity);
    updateItemQuantity(id, newQuantity);
  };

  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
          <div
            className={cn(
              "flex flex-col h-full",
              !totalAmount && "justify-center"
            )}
          >
            {totalAmount > 0 ? (
              <SheetHeader>
                <SheetTitle>
                  In cart <span className="font-bold">{items.length}</span>
                </SheetTitle>
              </SheetHeader>
            ) : (
                <SheetHeader className="hidden">
                    <SheetTitle>
                        Empty Cart
                    </SheetTitle>
                </SheetHeader>
            )}
            {/* mb-2 */}

            {!totalAmount && (
              <div className="flex flex-col items-center justify-center w-72 mx-auto">
                <Image
                  width={120}
                  height={120}
                  src="/empty-box.png"
                  alt="empty-cart"
                />
                <Title
                  text="Your cart is empty"
                  size="sm"
                  className="font-bold mt-2 text-center"
                />
                <p className="text-center text-neutral-500 mb-5">
                  Add items before placing an order
                </p>
                <SheetClose asChild>
                  <Button
                    className="w-56 h-12 text-base rounded-2xl cursor-pointer"
                    size="lg"
                  >
                    <ArrowLeft className="w-5 mr-2" />
                    <p>Go Back</p>
                  </Button>
                </SheetClose>
              </div>
            )}

            {totalAmount > 0 && (
              <>
                <div className="overflow-auto scrollbar flex-1">
                  <div className="flex flex-col gap-2">
                    {items.map((item) => (
                      <CartDrawerItem
                        key={item.id}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        details={getCartItemDetails(
                          item.ingredients,
                          item.pizzaType as PizzaType,
                          item.pizzaSize as PizzaSize
                        )}
                        disabled={item.disabled}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        onClickCountButton={(type) =>
                          onClickCountButton(item.id, item.quantity, type)
                        }
                        onClickDeleteButton={() => removeCartItem(item.id)}
                      />
                    ))}
                  </div>
                </div>

                <SheetFooter className="--mx-6 bg-white p-8">
                  <div className="w-full">
                    <div className="flex mb-4">
                      <span className="flex flex-1 text-lg text-neutral-500">
                        Total
                        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                      </span>
                      <span className="font-bold text-lg">{totalAmount}$</span>
                    </div>

                    <Link href="/checkout">
                      <Button
                        type="submit"
                        className="w-full h-12 text-base cursor-pointer rounded-2xl"
                      >
                        Place an order
                        <ArrowRight className="w-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </SheetFooter>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
