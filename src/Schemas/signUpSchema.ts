import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be atleast 2 characters")
  .max(10, "Username not more than 10 characters")
  .regex(
    /^[a-zA-Z][a-zA-Z0-9._]{2,15}$/,
    "Username must not contain special special characters"
  );

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password Must Be Atleast 6 Characters" }),
});
