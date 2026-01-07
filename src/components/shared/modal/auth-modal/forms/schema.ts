import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(4, { message: "Enter current password" });
export const formLoginSchema = z.object({
  email: z.email({ message: "Enter current email" }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .extend({
    fullName: z.string().min(2, { message: "Enter name and surname" }),
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password doesn`t match",
    path: ["confirmPassword"],
  });

  export type FormLoginValues = z.infer<typeof formLoginSchema>
  export type FormRegisterValues = z.infer<typeof formRegisterSchema>
