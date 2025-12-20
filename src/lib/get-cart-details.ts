import { CartDTO } from "../../shared/services/dto/cart-dto";
import { calcCartTotalAmount } from "./calc-cart-total-amount";

export type StateCartItem = {
  id: string;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  pizzaSize?: number | null;
  pizzaType?: number | null ;
  ingredients: Array<{ name: string; price: number }>;
};

interface Props {
  items: StateCartItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): Props => {
  console.log('DATA IN GET_DETAILS:', data);
  const items = (data.cartItems || []).map((item: any) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: calcCartTotalAmount(item),
    pizzaSize: item.productItem.size,
    pizzaType: item.productItem.pizzaType,
    ingredients: item.ingredients.map((ingredient: any) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  }));

  return {
    items,
    totalAmount: data.totalAmount,
  };
};
