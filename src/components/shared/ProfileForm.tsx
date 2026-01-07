'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { formRegisterSchema, FormRegisterValues } from "./modal/auth-modal/forms/schema";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Container } from "./Container";
import { Title } from "./Title";
import { FormInput } from "./form/FormInput";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateUserInfo } from "@/app/actions";


interface Props {
    data: User;
}

export const ProfileForm: React.FC<Props> = ({data}) => {
    const router = useRouter();

    const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });
  const onSubmit = async (data: FormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error('Данные обновлены 📝', {
        icon: '✅',
      });
    } catch (error) {
      return toast.error('Ошибка при обновлении данных', {
        icon: '❌',
      });
    }
  };

   const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  const onClickBack = () => {
    router.push('/')
  }
    return (
        <Container className="my-10">
            <div className="flex gap-5 items-center">
                <ArrowLeft onClick={onClickBack} className="cursor-pointer" />
                <Title text={`Personal info`} size="md" className="font-bold" />
            </div>
      <FormProvider {...form}>
        <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Full name" required />

          <FormInput type="password" name="password" label="New password" required />
          <FormInput type="password" name="confirmPassword" label="Returrn password" required />

          <Button disabled={form.formState.isSubmitting} className="text-base mt-10 rounded-2xl cursor-pointer" type="submit">
            Save
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base rounded-2xl cursor-pointer"
            type="button">
            SignOut
          </Button>
        </form>
      </FormProvider>
    </Container>
    )
}