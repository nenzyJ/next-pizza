import { Textarea } from "@/components/ui/textarea";
import { WhiteBlock } from "../WhiteBlock";
import { Input } from "@/components/ui/input";
import { FormInput } from "../form/FormInput";
import { useFormContext } from "react-hook-form";

interface Props {
    className?: string;
}

export const AddressForm: React.FC<Props> = ({ className }) => {
   const { register, formState: { errors } } = useFormContext();
    return (
        <WhiteBlock
            title="3. Shipping Address"
            className=""
            contentClassName=""
          >
            <div className="flex flex-col gap-5">
              <FormInput
              label=""
                name="address"
                className="text-base"
                placeholder="Address"
              />
              <Textarea
               {...register("comment")}
                placeholder="Comment to order"
                rows={5}
                className="text-base"
              />
            </div>
          </WhiteBlock>
    )
}