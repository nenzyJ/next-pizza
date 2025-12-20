export interface CartItemProps {
  id: string;
  price: number;
  imageUrl: string;
  details: string;
  name: string;
  quantity: number;
  disabled?: boolean;
}