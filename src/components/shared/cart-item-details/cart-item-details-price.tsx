import { cn } from "@/lib/utils";


interface Props {
  value: number;
  className?: string;
}

export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
  return <h2 className={cn('font-bold text-right min-w-[80px]', className)}>{value} $</h2>;
};