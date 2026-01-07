'use client';
import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./Container";
import Image from "next/image";
import Link from "next/link";
import { HInput } from "./HInput";
import { CartButton } from "./CartButton";
import { ProfileButton } from "./ProfileButton";
import { AuthModal } from "./modal/auth-modal/AuthModal";

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
  const [openModal, setOpenModal] = React.useState(false)
  return (
    <header className={cn("border-b")}>
      <Container className="flex items-center justify-between py-4 md:py-8">
        {/* Left side */}
        <Link href="/">
          <div className="flex items-center gap-2 md:gap-4">
            <Image src="/pizza-logo.svg" alt="Logo" width={28} height={28} className="md:w-[35px] md:h-[35px]" />
            <div>
              <h1 className="text-lg md:text-2xl uppercase font-black">Dovas Pizza</h1>
              <p className="text-xs md:text-sm text-gray-400 leading-3 hidden sm:block">
                It doesn't get any tastier than this.
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && <div className="hidden md:flex mx-10 flex-1">
          <HInput />
        </div>}

        <div className="flex gap-2 md:gap-4 items-center">
          <AuthModal open={openModal} onClose={()=> setOpenModal(false)} />
          <ProfileButton onClickSignIn={() => setOpenModal(true)}/>

            {hasCart && <CartButton />}

        </div>
      </Container>
    </header>
  );
};
