'use client';

import React from 'react';
import { X } from 'lucide-react';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import * as CartItemDetails from './cart-item-details';
import { cn } from '@/lib/utils';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className,
      )}>
      <div className="flex items-center gap-3 md:gap-5 flex-1 justify-between sm:justify-start">
        <div className="flex items-center gap-3 md:gap-5">
          <CartItemDetails.Image src={imageUrl} />
          <CartItemDetails.Info name={name} details={details} />
        </div>
        <CartItemDetails.Price value={price} />
      </div>

      <div className="flex items-center gap-3 md:gap-5 sm:ml-10 md:ml-20">
        <CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} />
        <button type="button" onClick={onClickRemove}>
          <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={18} />
        </button>
      </div>
    </div>
  );
};