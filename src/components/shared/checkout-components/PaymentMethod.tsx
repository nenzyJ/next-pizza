import React from 'react';
import { CreditCard, Truck } from 'lucide-react';
import { WhiteBlock } from '../WhiteBlock';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

interface Props {
  className?: string;
}

export const PaymentMethod: React.FC<Props> = ({ className }) => {
  const { watch, setValue, formState: { errors } } = useFormContext();
  const activePaymentMethod = watch('paymentMethod');

  return (
    <WhiteBlock
        title="4. Payment Method"
        className={className}
        contentClassName=""
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
             onClick={() => setValue('paymentMethod', 'card', { shouldValidate: true })}
             className={cn(
                 "flex items-center gap-3 p-4 rounded-2xl bg-white border cursor-pointer transition-all hover:bg-gray-50",
                 activePaymentMethod === 'card' ? "border-primary bg-primary/5" : "border-gray-100"
             )}>
             <CreditCard size={24} className={activePaymentMethod === 'card' ? "text-primary" : "text-gray-500"} />
             <span className="font-bold">Online Payment</span>
          </div>
           <div
             // Example: Cash might be disabled or enabled. Let's enable it for now.
             onClick={() => setValue('paymentMethod', 'cash', { shouldValidate: true })}
             className={cn(
                 "flex items-center gap-3 p-4 rounded-2xl bg-white border cursor-pointer transition-all hover:bg-gray-50",
                 activePaymentMethod === 'cash' ? "border-primary bg-primary/5" : "border-gray-100"
             )}>
              <Truck size={24} className={activePaymentMethod === 'cash' ? "text-primary" : "text-gray-500"} />
             <span className="font-bold">Cash on Delivery</span>
          </div>
      </div>
      {errors.paymentMethod?.message && (
          <p className="text-red-500 text-sm mt-2">{errors.paymentMethod.message as string}</p>
      )}
    </WhiteBlock>
  );
};
