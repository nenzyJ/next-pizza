
import { Button } from "../ui/button";
import { Title } from "./Title";
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
  return (
    <div className={cn(className, 'flex flex-1 md:flex-row flex-col')}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img src={imageUrl} alt={name} className="relative left-2 top-2 transition-all z-10 duration-300 w-[300px] h-[300px] md:w-[350px] md:h-[350px]" />
      </div>

      <div className="w-full md:w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <Button 
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Add to cart for {price} $
        </Button>
      </div>
    </div>
  )
};
