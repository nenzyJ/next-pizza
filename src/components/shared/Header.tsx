import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./Container";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowRight, ShoppingCart, User } from "lucide-react";

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  return (
    <header className={cn("border  ")}>
      <Container className="flex items-center justify-between py-8">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Logo" width={35} height={35} />
          <div>
            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
            <p className="text-sm text-gray-400 leading-3">
              It doesn't get any tastier than this.
            </p>
          </div>
        </div>
        <div className="mx-10 flex-1">
          <Input />
        </div>

        <div className="flex gap-4 items-center">
          <Button variant={"outline"} className="flex items-center gap-1 cursor-pointer">
            <User size={16} />
            Sign In
          </Button>
        
            <Button className="group relative cursor-pointer">
              <b>40$</b>
              <span className="h-full w-[1px] bg-white/30 mx-3" />
              <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                <ShoppingCart className="h-4 w-4 relative" strokeWidth={2} />
                <b>3</b>
              </div>
              <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
            </Button>
          
        </div>
      </Container>
    </header>
  );
};

