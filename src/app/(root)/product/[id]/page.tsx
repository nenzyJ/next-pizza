import { notFound } from "next/navigation";
import { Container, Title } from "@/components/shared";
import { ProductImage } from "@/components/shared/ProductImage";
import { SelectorSizes } from "@/components/shared/SelectorSizes";
import { prisma } from "../../../../../prisma/prisma";

interface ProductPageProps {
  // 1. Змінюємо тип на Promise
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // 2. Додаємо await, щоб "розпакувати" параметри
  const { id } = await params;

  const productId = Number(id);

  if (isNaN(productId)) {
    notFound();
  }

  const product = await prisma.product.findFirst({
    where: { id: productId },
  });

  if (!product) {
    notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage imageUrl={product.imageUrl} size={40} className="" />
        <div className="w-[490px] bg-[#FCFCFC] p-7">
            <Title text={product.name} size="md" className="font-extrabold mb-1"/>
            <p className="text-gray-400">Lorem ipsum dolar</p>
            <SelectorSizes value="3" items={[
                {
                    name: 'Small',
                    value: '1',
                },
                {
                    name: 'Middle',
                    value: '2',
                },
                {
                    name: 'Big',
                    value: '3',
                },
            ]} />
        </div>
      </div>
    </Container>
  );
}
