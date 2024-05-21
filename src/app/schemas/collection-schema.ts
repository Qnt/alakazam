import { Prisma } from "@prisma/client";
import { z } from "zod";

export const schema = z.object({
  name: z.string().trim().min(1, {
    message: "Имя не может быть пустым",
  }),
  description: z.string().trim().nullable().optional(),
  userId: z.string().trim().min(1, {
    message: 'userId не может быть пустым'
  }),
}) satisfies z.ZodType<Prisma.CollectionCreateWithoutCardsInput>;
