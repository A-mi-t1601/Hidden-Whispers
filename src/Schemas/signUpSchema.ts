import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(4, "Username Must Be Atleast 4 Characters.")
  .max(10, "Username Not Must Be More Than 10 Character")
  .regex(/^[a-zA-Z0-9_]+$/, "Username Must Not Contain Special Characters");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z
    .string()
    .min(5, { message: "Password Must Be At Least 5 Characters" }),
});
