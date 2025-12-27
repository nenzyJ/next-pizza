import { Ingredient, ProductItem } from "@prisma/client";
import { Button } from "../ui/button";
import { Title } from "./Title";
import { ProductImage } from "./ProductImage";
import { cn } from "@/lib/utils";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  onSubmit?: VoidFunction;
  loading?: boolean;
  className?: string;
}
export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  price,
  onSubmit,
  loading,
  className,
}) => {
  //   const totalPrice = 350;
  // const textDetaills = '30 sm, traditional 30'
  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img src={imageUrl} alt={name} className="realtive left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]" />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        {/* <p className="text-gray-400">{textDetaills}</p> */}

        <Button 
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  )
};
