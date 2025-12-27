import { cn } from '@/lib/utils';
import React from 'react'
import { CartItemDetailsImage } from './cart-item-details/cart-item-details-image';
import { CartItemProps } from './cart-item-details/cart-item-details.types';

import * as CartDetails from './cart-item-details'
import { CountButton } from './CountButton';
import { Trash2Icon } from 'lucide-react';

interface Props extends CartItemProps{
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickDeleteButton?: () => void;
    className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({imageUrl, name, price, quantity, details, className, onClickCountButton, onClickDeleteButton, disabled}) => {
  return (
    <div className={cn('flex bg-white p-5 gap-6', { 'opacity-50 pointer-events-none': disabled }, className)}>
      <CartDetails.Image src={imageUrl}/>

      <div className='flex-1'>
        <CartDetails.Info name={name} details={details} />

        <hr className='my-3' />
        <div className='flex justify-between items-center'>
          <CountButton onClick={onClickCountButton} value={quantity} />

            <div className='flex items-center gap-3'>
              <CartDetails.Price value={price} />
              <Trash2Icon onClick={onClickDeleteButton} className='text-gary-400 cursor-pointer hover:text-gray-600' size={16}/>

            </div>
        </div>
      </div>
    </div>
  )
}
