'use client';
import { cn } from '@/lib/utils'
import React from 'react'
import { useCategoryStore } from '../../../store/category';

interface CategoriesProps {
    className?: string,
}

const cats = [
  { id: 1, name: 'Піци' },
  { id: 2, name: 'Комбо' },
  { id: 3, name: 'Закуски' },
  { id: 4, name: 'Напої' },
  { id: 5, name: 'Десерти' }
];
// const activeIndex = 0;

export const Categories: React.FC<CategoriesProps> = ({className}) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl',className )}>
      {
        cats.map(({name, id}, index) => (
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

