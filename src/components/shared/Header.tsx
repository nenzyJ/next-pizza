import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./Container";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { HInput } from "./HInput";
import { CartButton } from "./CartButton";

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({
  hasSearch = true,
  hasCart = true,
  className,
}) => {
  return (
    <header className={cn("border  ")}>
      <Container className="flex items-center justify-between py-8">
        {/* Left side */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                It doesn't get any tastier than this.
              </p>
            </div>
          </div>
        </Link>
        <div className="mx-10 flex-1">
          <HInput />
        </div>

        <div className="flex gap-4 items-center">
          <Button
            variant={"outline"}
            className="flex items-center gap-1 cursor-pointer rounded-2xl"
          >
            <User size={16} />
            Sign In
          </Button>
        
            <CartButton/>
          
        </div>
      </Container>
    </header>
  );
};
