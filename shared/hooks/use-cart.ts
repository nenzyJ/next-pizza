import React from "react";
import { useCartStore } from "../store/cart";
import { useShallow } from "zustand/react/shallow";
import { CartItem } from "@prisma/client";
import { CreateCartItemValues } from "../services/dto/cart-dto";
import { StateCartItem } from "@/lib/get-cart-details";

type Props = {
  totalAmount: number;
  items: StateCartItem[];
  loading: boolean;
  updateItemQuantity: (id: string, quantity: number) => void;
  removeCartItem: (id: string) => void;
  addCartItem: (item: CreateCartItemValues) => void;
};

export const useCart = (): Props => {
  const cartState = useCartStore(useShallow((state) => state));

  React.useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState;
};
