"use server";

import { checkoutSchemaType } from "@/components/shared/checkout-components/schema/checkout-schema";
import { prisma } from "../../prisma/prisma";
import { OrderStatus, Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { sendEmail } from "@/lib/send-email";
import { EmailTemplate } from "@/components/shared/email-template/PayOrder";
import { getUserSession } from "@/lib/get-user-session";
import { hashSync } from "bcrypt";
import { VerificationUserTemplate } from "@/components/shared/email-template/verification-user";

export async function submitOrder(data: checkoutSchemaType) {
  // console.log("Order submitted:", data);

  // const token  = '1213'

  // await prisma.order.create({
  //     data: {
  //         token: token,
  //         totalAmount: 400 ,
  //         status: OrderStatus.PENDING,
  //         items: [],
  //         fullName: data.firstName + " " + data.lastName,
  //         email: data.email,
  //         phone: data.phone,
  //         address: data.address,
  //         comment: data.comment,
  //     }
  // })

  try {
    const cookieStore = await cookies();
    const cartToken = cookieStore.get("cartToken")?.value;
    if (!cartToken) {
      throw new Error("No cart token found");
    }
    //find cart by token
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        cartItems: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: { token: cartToken },
    });
    //if no cart found or cart is empty
    if (!userCart) {
      throw new Error("No cart found");
    }
    // if cart is empty, return error
    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.cartItems),
      },
    });
    // reset cart total amount to 0
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // TODO: payment methods, send email, etc.

    await sendEmail(data.email, 'DOVAS Pizza - Order Confirmation #' + order.id, EmailTemplate({ orderId: order.id, totalAmount: order.totalAmount, paymentUrl: 'https://nextjs.org/' }))
  } catch (error) {
    console.log("Error submitting order:", error);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();
    if(!currentUser){
      throw new Error('User doesn`t exist')
    }

    const findUser = await prisma.user.findUnique({
      where: {
        id: Number(currentUser.id)
      }
    });
    if(!findUser){
      throw new Error('User doesn`t exist')
    }
    await prisma.user.update({
      where: {
        id: Number(currentUser.id)
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password? hashSync(body.password as string, 10) : findUser?.password,
      }
    })
  } catch (error) {
    console.error('Error [UPDATE_USER]', error)
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Email not confirmed');
      }

      throw new Error('User already exists');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verififcationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      'Next Pizza / 📝 Registration confirmation',
      VerificationUserTemplate({
        code,
      }),
    );
     return { success: true };
  } catch (err) {
    console.log('Error [CREATE_USER]', err);
    throw err;
  }
}

