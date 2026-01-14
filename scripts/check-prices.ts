
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const cheesePizza = await prisma.product.findFirst({
    where: { name: 'Cheese Pizza' },
    include: { items: true }
  })
  
  console.log('Cheese Pizza prices:');
  console.table(cheesePizza?.items.map(item => ({
    size: item.size,
    type: item.pizzaType,
    price: item.price
  })));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
