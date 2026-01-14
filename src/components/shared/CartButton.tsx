'use client'

import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartDrawer } from "./CartDrawer";
import { useCartStore } from "../../../shared/store/cart";

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const [mounted, setMounted] = React.useState(false);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const items = useCartStore((state) => state.items);
  const loading = useCartStore((state) => state.loading);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const content = (
    <Button loading={loading || !mounted} className={cn("group relative cursor-pointer rounded-2xl text-sm md:text-base", {'w-[105px]': loading}, className)}>
      <b className="hidden xs:inline">{totalAmount} $</b>
      <b className="xs:hidden">{totalAmount}</b>
      <span className="h-full w-[1px] bg-white/30 mx-2 md:mx-3" />
      <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
        <ShoppingCart className="h-4 w-4 relative" strokeWidth={2} />
        <b>{items.length}</b>
      </div>
      <ArrowRight className="w-4 md:w-5 absolute right-3 md:right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
    </Button>
  );

  return mounted ? <CartDrawer>{content}</CartDrawer> : content;
};
