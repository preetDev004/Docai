import { z } from "zod";

export const sendMessageValidator = z.object({
  message: z.string().min(1),
  fileId: z.string(),
});
