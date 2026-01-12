import {z} from 'zod';

export const checkoutSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters long'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters long'),
    email: z.email({message: 'Invalid email address'}),
    phone: z.string().min(10, 'Phone number must be at least 10 characters long'),
    address: z.string().min(5, 'Address must be at least 5 characters long'),
    comment: z.string().optional(),
    paymentMethod: z.enum(['card', 'cash']),
}); 

export type checkoutSchemaType = z.infer<typeof checkoutSchema>;