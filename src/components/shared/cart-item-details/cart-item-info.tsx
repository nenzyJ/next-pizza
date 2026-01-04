import { cn } from "@/lib/utils";

interface Props {
  name: string;
  details: string;
  className?: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, details, className }) => {
    

  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className="text-base md:text-lg font-bold flex-1 leading-5 md:leading-6">{name}</h2>
      </div>
      {details.length > 0 && <p className="text-xs text-gray-400 w-[90%]">{details}</p>}
    </div>
  );
};