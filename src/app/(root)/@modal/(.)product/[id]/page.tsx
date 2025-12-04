import { notFound } from "next/navigation";
import { prisma } from "../../../../../../prisma/prisma";
import { ChooseModal } from "@/components/shared/modal/ChooseModal";

export default async function ProductModalPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }
  

  return (
   <div>
        <ChooseModal product={product} />;
   </div>

  )
}
