"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { ChooseProductForm } from "../ChooseProductForm";
import { ProductWithRelations } from "../../../../@types/product";
import { ChoosePizzaForm } from "../ChoosePizzatForm";
interface Props {
  className?: string;
  product: ProductWithRelations;
}
export const ChooseModal: React.FC<Props> = ({ product, className }) => {

  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].pizzaType);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] min-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className,
        )}
      >
        <DialogTitle/>
        {
          isPizzaForm? (
            <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} items={product.items} />
          ) : <ChooseProductForm imageUrl={product.imageUrl} name={product.name}/>

        }
      </DialogContent>
    </Dialog>
  );
};
