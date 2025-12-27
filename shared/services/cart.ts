import { axiosInstance } from "./axios";
import { CartDTO, CreateCartItemValues } from "./dto/cart-dto";

export const getCart = async (): Promise<CartDTO> => {
  return (await axiosInstance.get<CartDTO>("/cart")).data;
};

export const updateItemQuantity = async (
  itemId: string,
  quantity: number
): Promise<CartDTO> => {
  console.log("API call - itemId:", itemId, "quantity:", quantity);

  return (await axiosInstance.patch<CartDTO>("/cart/" + itemId, { quantity }))
    .data;
};

export const removeCartItem = async (itemId: string): Promise<CartDTO> => {
  return (await axiosInstance.delete<CartDTO>("/cart/" + itemId)).data;
}

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
  return (await axiosInstance.post<CartDTO>("/cart", values)).data;
}
