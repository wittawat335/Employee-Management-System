import * as z from "zod";

// ============================================================
// USER
// ============================================================

export const SignupValidation = z
  .object({
    fullname: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." }),
    username: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters." }),
    confirmPassword: z
      .string()
      .min(5, { message: "Password must be at least 5 characters." }),
    roles: z.string().array(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters." }),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});

// ============================================================
// PRODUCT
// ============================================================
export const ProductValidation = z.object({
  caption: z
    .string()
    .min(5, { message: "Minimum 5 characters." })
    .max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(1, { message: "This field is required" })
    .max(1000, { message: "Maximum 1000 characters." }),
  tags: z.string(),
});

export type TSignUpSchema = z.infer<typeof SignupValidation>;
