import { signIn, useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import { CircleUser, User } from "lucide-react";
import Link from "next/link";

interface ProfileButtonProps {
    onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({ className, onClickSignIn }) => {
  const { data: session } = useSession();
  return (
    <div className={className}>
      { !session ? 
     <Button onClick={onClickSignIn}
        variant={"outline"}
        className="flex items-center gap-1 cursor-pointer rounded-2xl"
      >
        <User size={16} />
        <span className="hidden sm:inline">Sign In</span>
      </Button> : 
      <Link href="/profile">
        <Button variant='outline' className="flex items-center gap-1 cursor-pointer rounded-2xl">
            <CircleUser size={18} />
            Profile
        </Button>
      </Link>
    }
    </div>
  );
};

// onClick={() => signIn("github", { callbackUrl: "/", redirect: true })}
