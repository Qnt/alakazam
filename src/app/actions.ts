"use server";

import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "~/server/db";

const schema = z.object({
  name: z
    .string({
      required_error: "Имя обязательно",
      invalid_type_error: "Имя должно быть строкой",
    })
    .min(1, {
      message: "Имя не может быть пустым",
    }),
  description: z
    .string({
      invalid_type_error: "Описание должно быть строкой",
    })
    .nullable()
    .optional(),
  userId: z.string({
    required_error: "UserId обязателен",
  }),
}) satisfies z.ZodType<Prisma.CollectionCreateWithoutCardsInput>;

export type FormState = {
  errors?: {
    name?: string[];
    description?: string[];
    userId?: string[];
  };
  message?: string | null;
};

export async function createCollection(
  prevState: FormState,
  formData: FormData,
) {
  const { userId } = auth();

  const description = formData.get("description");

  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    description: description === "" ? null : description,
    userId,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ошибка при создании коллекции",
    };
  }

  const collection = await db.collection.create({
    data: {
      name: validatedFields.data.name,
      description: validatedFields.data.description,
      userId: validatedFields.data.userId,
    },
  });

  revalidatePath("/");

  return {
    message: `Коллекция "${validatedFields.data.name}" добавлена`
  }
}
