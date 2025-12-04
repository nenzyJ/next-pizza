import { Ingredient, ProductItem } from "@prisma/client";
import { Button } from "../ui/button";
import { Title } from "./Title";
import { ProductImage } from "./ProductImage";
import { cn } from "@/lib/utils";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  
  loading?: boolean;
  className?: string;
}
export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  imageUrl,
  ingredients,
  loading,
  className,
}) => {
    const totalPrice = 350;
  const textDetaills = '30 sm, traditional 30';
  const size = 30;
  return (
    <div className={cn(className, 'flex flex-1')}>
      <ProductImage imageUrl={imageUrl} size={size}  />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetaills}</p>

        <Button
          
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
};
