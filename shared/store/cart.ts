import { create } from "zustand";
import { Api } from "../services/api-client";
import { getCartDetails, StateCartItem } from "@/lib/get-cart-details";
import { CreateCartItemValues } from "../services/dto/cart-dto";

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: StateCartItem[];

  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: string, quantity: number) => Promise<void>;
  addCartItem: (values: any) => Promise<void>;
  removeCartItem: (id: string) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });

      const data = await Api.cart.getCart();

      set(getCartDetails(data));
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: string, quantity: number) => {
    try {
      set({ loading: true, error: false });

      const data = await Api.cart.updateItemQuantity(id, quantity);

      set(getCartDetails(data));
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  removeCartItem: async (id: string) => {
    try {
      set((state) => ({
        loading: true,
        error: false,
        items: state.items.map((item) =>
          item.id === id ? { ...item, disabled: true } : item
        ),
      }));

      const data = await Api.cart.removeCartItem(id);

      set(getCartDetails(data));
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set((state) => ({
        loading: false,
        items: state.items.map((item) => ({ ...item, disabled: false })),
      }));
    }
  },
  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false });

      const data = await Api.cart.addCartItem(values);

      set(getCartDetails(data));
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
