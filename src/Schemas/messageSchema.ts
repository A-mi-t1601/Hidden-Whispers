import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Content Must Be Atleast 10 Character." })
    .max(500, { message: "Content Must No Longer Than 500 Character." }),
});
