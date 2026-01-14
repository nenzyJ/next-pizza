import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import { findOrCreateCart } from "@/lib/find-or-create-cart";
import { CreateCartItemValues } from "../../../../shared/services/dto/cart-dto";

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    // Знаходимо всі товари з таким же productItemId
    const cartItems = await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
      },
      include: {
        ingredients: true,
      },
    });

    // Сортуємо інгредієнти для порівняння
    const newIngredients = (data.ingredients || []).sort((a, b) => a - b);

    // Шукаємо товар з точно такими ж інгредієнтами
    const findCartItem = cartItems.find((item) => {
      const itemIngredients = item.ingredients
        .map((ing) => ing.id)
        .sort((a, b) => a - b);

      // Порівнюємо масиви інгредієнтів
      return (
        itemIngredients.length === newIngredients.length &&
        itemIngredients.every((id, index) => id === newIngredients[index])
      );
    });

    // Якщо знайшли точно таку ж піцу - збільшуємо кількість
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      // Інакше створюємо новий товар
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });
    }

    const updatedCartItem = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedCartItem);
    resp.cookies.set("cartToken", token);
    return resp;
  } catch (error) {
    console.log("[CART_POST] Server error", error);
    return NextResponse.json(
      { message: "Не удалось создать корзину" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const updatedCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedCart);
    resp.cookies.set("cartToken", token);
    return resp;
  } catch (error) {
    console.log("[CART_GET] Server error", error);
    return NextResponse.json(
      { message: "Не удалось получить корзину" },
      { status: 500 }
    );
  }
}