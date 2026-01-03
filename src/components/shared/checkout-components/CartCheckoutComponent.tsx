import { getCartItemDetails } from "@/lib/get-cart-item-details";
import { CheckoutItem } from "../CheckOutItem";
import { WhiteBlock } from "../WhiteBlock";
import { PizzaSize, PizzaType } from "../../../../shared/constants/pizza";
import { removeCartItem } from "../../../../shared/services/cart";
import { StateCartItem } from "@/lib/get-cart-details";


interface Props {
    
    items: StateCartItem[];
    onClickCountButton: (id: string, quantity: number, type: "plus" | "minus") => void;
    className?: string;
}

export const CartCheckoutComponent: React.FC<Props> = ({ items, onClickCountButton, className }) => {
    return (
        <WhiteBlock title="1. Cart" className={className} contentClassName="">
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
    )
}