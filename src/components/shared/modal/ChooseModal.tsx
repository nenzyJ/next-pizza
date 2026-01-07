"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { ChooseProductForm } from "../ChooseProductForm";
import { ProductWithRelations } from "../../../../@types/product";
import { ChoosePizzaForm } from "../ChoosePizzatForm";
import { useCartStore } from "../../../../shared/store/cart";
import toast from "react-hot-toast";

interface Props {
  className?: string;
  product: ProductWithRelations;
}

export const ChooseModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firtsItem = product.items[0];
  const isPizzaForm = Boolean(firtsItem.pizzaType);

  // ВИПРАВЛЕННЯ: Використовуйте окремі виклики або об'єктну деструктуризацію
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const onAddProduct = () => {
    // addCartItem({
    //   productItemId: firtsItem.id,
    // });
  };

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      if (isPizzaForm && productItemId && ingredients) {
        const itemId = productItemId ?? firtsItem.id;

        await addCartItem({
          productItemId,
          ingredients,
        });
      } else {
        await addCartItem({
          productItemId: firtsItem.id,
        });
      }
      toast.success("Product added to cart");
      router.back();
    } catch (error) {
      toast.error("Failed to add product to cart");
      console.log("Failed to add product to cart:", error);
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-full md:w-[1060px] md:max-w-[1060px] md:min-h-[500px] bg-white overflow-hidden md:overflow-visible",
          className
        )}
      >
        <DialogTitle className="hidden" />
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onSubmit={onSubmit}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onSubmit={onSubmit}
            price={firtsItem.price}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
