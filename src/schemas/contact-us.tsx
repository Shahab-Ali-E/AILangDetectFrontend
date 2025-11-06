import { z } from "zod";

export const ContactUsFormSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 chars" })
    .max(20, { message: "First name must be under 20 chars" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Only letters and spaces allowed" }),
  lastName: z
    .string()
    .min(3, { message: "Last name must be at least 3 chars" })
    .max(20, { message: "Last name must be under 20 chars" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Only letters and spaces allowed" }),
  email: z
    .string()
    .email({ message: "Enter a valid email" })
    .max(50, { message: "Email must be under 50 chars" }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 chars" })
    .max(250, { message: "Description must be under 250 chars" }),
  phone: z.string().optional(),
});

export type ContactUsFormType = z.infer<typeof ContactUsFormSchema>;
