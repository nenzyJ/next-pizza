"use client";

import { Container, Title } from "@/components/shared";
import { CheckoutItem } from "@/components/shared/CheckOutItem";
import { CheckoutItemDetails } from "@/components/shared/CheckoutItemDetails";
import { WhiteBlock } from "@/components/shared/WhiteBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import React from "react";
import { useCart } from "../../../../shared/hooks/use-cart";
import { getCartItemDetails } from "@/lib/get-cart-item-details";
import { PizzaSize, PizzaType } from "../../../../shared/constants/pizza";

const TAX = 15;
const DELIVERY_FEE = 5;

export default function page() {
  const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();
  const onClickCountButton = (
    id: string,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    if (newQuantity < 1) {
      return; //
    }

    console.log("CartDrawer - id:", id, "newQuantity:", newQuantity);
    updateItemQuantity(id, newQuantity);
  };

  const taxPrice = (totalAmount * TAX) / 100;

  const totalPrice = totalAmount + taxPrice + DELIVERY_FEE;


  return (
    <Container className="mt-10">
      <Title text="Checkout" className="font-extrabold mb-8 text-[36px]" />

      <div className="flex gap-40">
        {/* L */}
        <div className="flex flex-col gap-5 flex-1 mb-20">
          <WhiteBlock title="1. Cart" className="" contentClassName="">
            <div className="flex flex-col gap-5 ">
              {items.map((item) => (
                <CheckoutItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  details={getCartItemDetails(
                    item.ingredients,
                    item.pizzaType as PizzaType,
                    item.pizzaSize as PizzaSize
                  )}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  disabled={item.disabled}
                  onClickCountButton={(type) =>
                    onClickCountButton(item.id, item.quantity, type)
                  }
                  onClickRemove={() => removeCartItem(item.id)}
                />
              ))}
            </div>
          </WhiteBlock>

          <WhiteBlock
            title="2. Customer Information"
            className=""
            contentClassName=""
          >
            <div className="grid grid-cols-2 gap-5">
              <Input
                name="firstName"
                className="text-base"
                placeholder="First Name"
              />
              <Input
                name="lastName"
                className="text-base"
                placeholder="Last Name"
              />
              <Input name="email" className="text-base" placeholder="Email" />
              <Input
                name="phone"
                className="text-base"
                placeholder="Phone Number"
              />
            </div>
          </WhiteBlock>

          <WhiteBlock
            title="3. Shipping Address"
            className=""
            contentClassName=""
          >
            <div className="flex flex-col gap-5">
              <Input
                name="Address"
                className="text-base"
                placeholder="Address"
              />
              <Textarea
                placeholder="Comment to order"
                rows={5}
                className="text-base"
              />
            </div>
          </WhiteBlock>
        </div>

        {/* R */}
        <div className="w-[450px]">
          <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Total:</span>
              <span className="text-[34px] font-extrabold">{totalPrice}</span>
            </div>

            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Package size={18} className="mr-2 text-gray-400" />
                  Total Amount:
                </div>
              }
              value={`${totalAmount} $`}
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Percent size={18} className="mr-2 text-gray-400" />
                  Tax:
                </div>
              }
              value={`${taxPrice} $`}
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Truck size={18} className="mr-2 text-gray-400" />
                  Delivery Fee:
                </div>
              }
              value={`${DELIVERY_FEE} $`}
            />

            <Button
              type="submit"
              className="w-full h-14 rounded-2xl mt-6 text-base font-bold flex items-center justify-center"
            >
              Place Order
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
}
