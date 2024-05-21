"use server";

import { auth } from "@clerk/nextjs/server";
import { type Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { type z } from "zod";
import { db } from "~/server/db";
import { schema } from "./schemas/collection-schema";

schema satisfies z.ZodType<Prisma.CollectionCreateWithoutCardsInput>;

export type FormState = {
  success: boolean;
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

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  const description = formData.get("description");

  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    description: description === "" ? null : description,
    userId,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ошибка при создании коллекции",
    };
  }

  await db.collection.create({
    data: {
      name: validatedFields.data.name,
      description: validatedFields.data.description,
      userId: validatedFields.data.userId,
    },
  });

  revalidatePath("/");

  return {
    success: true,
    message: `Коллекция "${validatedFields.data.name}" добавлена`,
  };
}
