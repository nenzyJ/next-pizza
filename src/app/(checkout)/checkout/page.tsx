"use client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { FormInput } from "@/components/shared/form/FormInput";
import { CartCheckoutComponent } from "@/components/shared/checkout-components/CartCheckoutComponent";
import { CustomerForm } from "@/components/shared/checkout-components/CustomerForm";
import { AddressForm } from "@/components/shared/checkout-components/AddressForm";
import {
  checkoutSchema,
  checkoutSchemaType,
} from "@/components/shared/checkout-components/schema/checkout-schema";
import { submitOrder } from "@/app/actions";
import toast from "react-hot-toast";

const TAX = 15;
const DELIVERY_FEE = 5;

export default function page() {
  const [submitting, setSubmitting] = React.useState(false);
  const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();

  const form = useForm<checkoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = async(data: checkoutSchemaType) => {
    // console.log("Form submitted with data:", data);
    // submitOrder(data);
    try {
      setSubmitting(true);
      const url = await submitOrder(data) as string | undefined;

      toast.success("Order submitted successfully!");

      if(url) {
        location.href = url;
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      toast.error("Failed to submit order. Please try again.");
    }
  };

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

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-40">
            {/* L */}
            <div className="flex flex-col gap-5 flex-1 mb-20">
              <CartCheckoutComponent
                items={items}
                onClickCountButton={onClickCountButton}
              />

              <CustomerForm />

              <AddressForm />
            </div>

            {/* R */}
            <div className="w-[450px]">
              <WhiteBlock className="p-6 sticky top-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xl">Total:</span>
                  <span className="text-[34px] font-extrabold">
                    {totalPrice}
                  </span>
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
        </form>
      </FormProvider>
    </Container>
  );
}
