import { Prisma } from '@prisma/client';
import { categories, _ingredients, products } from './constats';
import { prisma } from './prisma';
import { hashSync } from 'bcrypt';
import dotenv from 'dotenv';

// Загружаем переменные окружения
dotenv.config();

console.log('Seed file loaded');

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: Math.round(((size ? (size * 10) : 190) + (pizzaType === 2 ? 20 : 0)) / 40),
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  console.log('Creating users...');
  const user1 = await prisma.user.create({
    data: {
      fullName: 'User Test',
      email: 'userTest@gmail.com',
      password: hashSync('111111', 10),
      verified: new Date(),
      role: 'USER',
    },
  });
  const user2 = await prisma.user.create({
    data: {
      fullName: 'Admin Admin',
      email: 'admin@gmail.com',
      password: hashSync('111111', 10),
      verified: new Date(),
      role: 'ADMIN',
    },
  });

  console.log('Creating categories...');
  const categoryResult = await prisma.category.createMany({
    data: categories,
  });
  console.log(`Created ${categoryResult.count} categories`);

  console.log('Creating ingredients...');
  await prisma.ingredient.createMany({
    data: _ingredients.map((item) => ({ ...item, price: Math.round(item.price / 40) })),
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Pepperoni Fresh',
      imageUrl:
        '/Pepperoni Fresh.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5).map((ing) => ({ id: ing.id })),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Cheese Pizza',
      imageUrl:
        '/Cheese Pizza.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10).map((ing) => ({ id: ing.id })),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Chorizo Fresh',
      imageUrl:
        '/Chorizo Fresh.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 40).map((ing) => ({ id: ing.id })),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      // Пицца "Пепперони фреш"
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

      // Пицца "Сырная"
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

      // Пицца "Чоризо фреш"
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

      // Остальные продукты
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: user1.id,
        totalAmount: 0,
        token: '11111',
      },
      {
        userId: user2.id,
        totalAmount: 0,
        token: '222222',
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
        ],
      },
    },
  });
   await prisma.story.createMany({
    data: [
      {
        previewImageUrl: '/story1.png',
      },
      {
        previewImageUrl: '/story2.png',
      },
      {
        previewImageUrl: '/story3.png',
      },
      {
        previewImageUrl: '/story4.png',
      },
      {
        previewImageUrl: '/story5.png',
      },
      {
        previewImageUrl: '/story6.png',
      },
    ],
  });
   await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl: '/story-item1.png',
      },
      {
        storyId: 1,
        sourceUrl: '/story-item2.png',
      },
      {
        storyId: 1,
        sourceUrl: '/story-item3.png',
      },
      {
        storyId: 1,
        sourceUrl: '/story-item4.png',
      },
      {
        storyId: 1,
        sourceUrl: '/story-item5.png',
      },
    ],
  });
}

async function down() {
  console.log('Clearing database...');
  try {
    // Используем TRUNCATE с RESTART IDENTITY для сброса автоинкремента
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "VerififcationCode" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    console.log('Database cleared successfully');
  } catch (error) {
    console.warn('Error clearing database (might be empty):', error);
    // Продолжаем выполнение даже если таблицы пусты
  }
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });