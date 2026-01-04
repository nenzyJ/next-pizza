import { Input } from "@/components/ui/input";
import { WhiteBlock } from "../WhiteBlock";
import { FormInput } from "../form/FormInput";

interface Props {
    className?: string;
}

export const CustomerForm: React.FC<Props> = ({ className }) => {
    return (
        <WhiteBlock
            title="2. Customer Information"
            className={className}
            contentClassName=""
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              <FormInput label=""
                name="firstName"
                className="text-sm md:text-base"
                placeholder="First Name"
              />
              <FormInput label=""
                name="lastName"
                className="text-sm md:text-base"
                placeholder="Last Name"
              />
              <FormInput label="" name="email" className="text-sm md:text-base" placeholder="Email" />
              <FormInput
                label=""
                name="phone"
                className="text-sm md:text-base"
                placeholder="Phone"
              />
            </div>
          </WhiteBlock>
    )
}