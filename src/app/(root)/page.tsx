import { Container, SortPopup, Title, TopBar } from '@/components/shared'
import { Filters } from '@/components/shared/Filters'
import { ProductsGroupList } from '@/components/shared/ProductsGroupList'
import React from 'react'
import { prisma } from '../../../prisma/prisma'

export default async function page() {

  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          items: true,
          ingredients: true,
        }
      }
    }
  });
  return (
    <div>
      <Container className='mt-10'>
        <Title text="All Pizzas" size="lg" className="font-extrabold" />
      </Container>
      <TopBar categories={categories.filter((category) => category.products.length > 0 )}/>
      <Container className='mt-10'>
        <div className='flex gap-[80px]'>
          {/* Filter */}
          <div className='w-[250px]'>
            <Filters/>  
          </div>

          {/* product list */}
          <div className='flex-1'>
            <div className='flex flex-col gap-16'>
              {/* <ProductList/> */}
              {
                categories.map((category) => 
                  category.products.length > 0 && (
                    <ProductsGroupList 
                    key={category.id}
                    title={category.name}
                    categoryId={category.id}
                    products={category.products}
                    />
                  )
                )
              }
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}







