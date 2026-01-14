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
import { PaymentMethod } from "@/components/shared/checkout-components/PaymentMethod";
import { submitOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Api } from "../../../../shared/services/api-client";

const TAX = 15;
const DELIVERY_FEE = 5;

export default function page() {
  const [submitting, setSubmitting] = React.useState(false);
  const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();

  const { data: session } = useSession();

  const form = useForm<checkoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      firstName: session?.user?.name || '',
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  React.useEffect(() => {
    async function fetchUserInfo() {
       const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(" ");
     

      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);

      console.log(data);
    }

    if(session) {
      fetchUserInfo();
    }
  }, [session]);

  const onSubmit = async(data: checkoutSchemaType) => {
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
    <Container className="mt-5 md:mt-10">
      <Title text="Checkout" className="font-extrabold mb-4 md:mb-8 text-2xl md:text-[36px]" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-40">
            {/* L */}
            <div className="flex flex-col gap-4 md:gap-5 flex-1 mb-10 md:mb-20">
              <CartCheckoutComponent
                items={items}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
              />

              <CustomerForm />

              <AddressForm />

              <PaymentMethod />
            </div>

            {/* R */}
            <div className="w-full lg:w-[450px]">
              <WhiteBlock className="p-4 md:p-6 lg:sticky lg:top-4">
                <div className="flex flex-col gap-1">
                  <span className="text-lg md:text-xl">Total:</span>
                  <span className="text-2xl md:text-[34px] font-extrabold">
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
                  className="w-full h-12 md:h-14 rounded-2xl mt-4 md:mt-6 text-sm md:text-base font-bold flex items-center justify-center"
                >
                  Place Order
                  <ArrowRight className="w-4 md:w-5 ml-2" />
                </Button>
              </WhiteBlock>
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}