'use client';
import { cn } from '@/lib/utils'
import React from 'react'
import { useCategoryStore } from '../../../store/category';
import { Category } from '@prisma/client';

interface CategoriesProps {
  items: Category[],
    className?: string,
}


// const activeIndex = 0;

export const Categories: React.FC<CategoriesProps> = ({items ,className}) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl',className )}>
      {
        items.map(({name, id}, index) => (
            <a className={cn('flex items-center font-bold h-11 rounded-2xl px-5',
                categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
            )} 
            href={`/#${name}`}
            key={index}>
                <button className='cursor-pointer'>
                    {name}
                </button>
            </a>
        ))
      }
    </div>
  )
}

