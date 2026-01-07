import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, FormLoginValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@/components/shared/Title";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { FormInput } from "@/components/shared/form/FormInput";
import { Button } from "@/components/ui/button";
interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<FormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: FormLoginValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success("Вы успешно вошли в аккаунт", {
        icon: "✅",
      });

      onClose?.();
    } catch (error) {
      console.error("Error [LOGIN]", error);
      toast.error("Не удалось войти в аккаунт", {
        icon: "❌",
      });
    }
  };
  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <div className="mr-2">
            <Title text="Sign In" size="md" className="font-bold" />
            <p className="text-gray-400">
              Enter your email to log in your account{" "}
            </p>
          </div>
        </div>
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Password" type="password" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base cursor-pointer rounded-2xl"
          type="submit"
          variant='outline'
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
};
