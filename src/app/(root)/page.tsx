import { Container, SortPopup, Title, TopBar } from "@/components/shared";
import { Filters } from "@/components/shared/Filters";
import { ProductsGroupList } from "@/components/shared/ProductsGroupList";
import React, { Suspense } from "react";
import { findPizzas, GetSearchPizzasParams } from "@/lib/find-pizzas";
import { Stories } from "@/components/shared/Stories";

export default async function page({searchParams}: {searchParams: Promise<GetSearchPizzasParams>}) {
  const params = await searchParams;
  const categories = await findPizzas(params);
  return (
    <div>
      <Container className="mt-5 md:mt-10">
        <Title text="All Pizzas" size="lg" className="font-extrabold" />
      </Container>
      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />
      <Stories/>
      <Container className="mt-5 md:mt-10">
        <div className="flex gap-8 lg:gap-[80px]">
          {/* Filter - Hidden on mobile */}
          <div className="hidden lg:block w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* product list */}
          <div className="flex-1">
            <div className="flex flex-col gap-8 md:gap-16">
              {/* <ProductList/> */}
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      products={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
