import { notFound } from "next/navigation";
import { prisma } from "../../../../prisma/prisma";

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
        where: { id: productId }
    });

    if (!product) {
        notFound();
    }

    return <p className="">Product {product.name}</p>;
}