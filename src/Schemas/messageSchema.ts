import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Content Must Be At Least Of 10 Characters" })
    .max(500, { message: "Content Must Be No Longer Than 500 Characters" }),
});
