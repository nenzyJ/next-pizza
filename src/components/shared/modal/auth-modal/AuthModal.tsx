import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import React from "react";
import { LoginForm } from "./forms/LoginForm";
import { RegisterForm } from "./forms/RegisterForm";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
  const [type, setType] = React.useState<"login" | "register">("login");

  const onSwitchType = () => {
    setType(type === "login" ? "register" : "login");
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
      <DialogTitle className="hidden">Authorization</DialogTitle>
       {
        type === 'login' ? (<LoginForm onClose={handleClose} />) : (<RegisterForm onClose={handleClose} />)
       }

        <div className="flex gap-2">
          <Button
            variant='outline'
            onClick={() =>
              signIn("github", {
                callbackUrl: "/",
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1 cursor-pointer rounded-2xl"
          >
            <img
              src="https://github.githubassets.com/favicons/favicon.svg"
              alt="GitHub"
              className="w-6 h-6"
            />
            GitHub
          </Button>

          <Button
            variant='outline'
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1 cursor-pointer rounded-2xl"
          >
            <img
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="Google"
              className="w-6 h-6"
            />
            Google
          </Button>
        </div>
        <Button
          variant='default'
          onClick={onSwitchType}
          type="button"
          className="h-12 cursor-pointer rounded-2xl"
        >
          {type !== "login" ? "Sign In" : "Register"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
