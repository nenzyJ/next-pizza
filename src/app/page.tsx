import { Container, SortPopup, Title, TopBar } from '@/components/shared'
import {Categories} from '@/components/shared/Categories'
import { Filters } from '@/components/shared/Filters'
import { ProductCard } from '@/components/shared/ProductCard'
import { ProductsGroupList } from '@/components/shared/ProductsGroupList'
import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
  return (
    <div>
      <Container className='mt-10'>
        <Title text="All Pizzas" size="lg" className="font-extrabold" />
      </Container>
      <TopBar/>
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
              <ProductsGroupList title='Pizzas' products={[
                {
                id: 1,
                imageUrl: 'https://smaki-maki.com/image/cache/catalog/%D0%9F%D1%96%D1%86%D0%B8%20%D0%A1%D0%9C/%D0%92%D0%B5%D0%B3%D0%B5%D1%82%D0%B0%D1%80%D1%96%D0%B0%D0%BD%D1%81%D1%8C%D0%BA%D0%B0%20%D0%A1%D0%9C-500x500.jpg',
                title: 'Pepperoni Fresh Pizza',
                price: 22,
                items: [{ price: 22}]
              },
                {
                id: 2,
                imageUrl: 'https://smaki-maki.com/image/cache/catalog/%D0%9F%D1%96%D1%86%D0%B8%20%D0%A1%D0%9C/%D0%92%D0%B5%D0%B3%D0%B5%D1%82%D0%B0%D1%80%D1%96%D0%B0%D0%BD%D1%81%D1%8C%D0%BA%D0%B0%20%D0%A1%D0%9C-500x500.jpg',
                title: 'Pepperoni Fresh Pizza',
                price: 22,
                items: [{ price: 22}]
              },
                {
                id: 3,
                imageUrl: 'https://smaki-maki.com/image/cache/catalog/%D0%9F%D1%96%D1%86%D0%B8%20%D0%A1%D0%9C/%D0%92%D0%B5%D0%B3%D0%B5%D1%82%D0%B0%D1%80%D1%96%D0%B0%D0%BD%D1%81%D1%8C%D0%BA%D0%B0%20%D0%A1%D0%9C-500x500.jpg',
                title: 'Pepperoni Fresh Pizza',
                price: 22,
                items: [{ price: 22}]
              },
                {
                id: 4,
                imageUrl: 'https://smaki-maki.com/image/cache/catalog/%D0%9F%D1%96%D1%86%D0%B8%20%D0%A1%D0%9C/%D0%92%D0%B5%D0%B3%D0%B5%D1%82%D0%B0%D1%80%D1%96%D0%B0%D0%BD%D1%81%D1%8C%D0%BA%D0%B0%20%D0%A1%D0%9C-500x500.jpg',
                title: 'Pepperoni Fresh Pizza',
                price: 22,
                items: [{ price: 22}]
              },
              ]} categoryId={1}/>
              <ProductsGroupList title='Pizzas' products={[
                {
                id: 1,
                imageUrl: 'https://smaki-maki.com/image/cache/catalog/%D0%9F%D1%96%D1%86%D0%B8%20%D0%A1%D0%9C/%D0%92%D0%B5%D0%B3%D0%B5%D1%82%D0%B0%D1%80%D1%96%D0%B0%D0%BD%D1%81%D1%8C%D0%BA%D0%B0%20%D0%A1%D0%9C-500x500.jpg',
                title: 'Pepperoni Fresh Pizza',
                price: 22,
                items: [{ price: 22}]
              },
                {
                id: 2,
                imageUrl: 'https://smaki-maki.com/image/cache/catalog/%D0%9F%D1%96%D1%86%D0%B8%20%D0%A1%D0%9C/%D0%92%D0%B5%D0%B3%D0%B5%D1%82%D0%B0%D1%80%D1%96%D0%B0%D0%BD%D1%81%D1%8C%D0%BA%D0%B0%20%D0%A1%D0%9C-500x500.jpg',
                title: 'Pepperoni Fresh Pizza',
                price: 22,
                items: [{ price: 22}]
              },
                {
                id: 3,
                imageUrl: 'https://smaki-maki.com/image/cache/catalog/%D0%9F%D1%96%D1%86%D0%B8%20%D0%A1%D0%9C/%D0%92%D0%B5%D0%B3%D0%B5%D1%82%D0%B0%D1%80%D1%96%D0%B0%D0%BD%D1%81%D1%8C%D0%BA%D0%B0%20%D0%A1%D0%9C-500x500.jpg',
                title: 'Pepperoni Fresh Pizza',
                price: 22,
                items: [{ price: 22}]
              },
                {
                id: 4,
                imageUrl: 'https://smaki-maki.com/image/cache/catalog/%D0%9F%D1%96%D1%86%D0%B8%20%D0%A1%D0%9C/%D0%92%D0%B5%D0%B3%D0%B5%D1%82%D0%B0%D1%80%D1%96%D0%B0%D0%BD%D1%81%D1%8C%D0%BA%D0%B0%20%D0%A1%D0%9C-500x500.jpg',
                title: 'Pepperoni Fresh Pizza',
                price: 22,
                items: [{ price: 22}]
              },
              ]} categoryId={2}/>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default page
