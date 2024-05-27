"use server";

import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { type z } from "zod";
import { db } from "~/server/db";
import { schema } from "../app/schemas/collection-schema";

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
  _prevState: FormState,
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

  try {
    await db.collection.create({
      data: {
        name: validatedFields.data.name,
        description: validatedFields.data.description,
        userId: validatedFields.data.userId,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.error(
          "There is a unique constraint violation, a new collection cannot be created with this name",
        );
        return {
          success: false,
          message:
            "Коллекция с таким именем уже существует. Пожалуйста, выберите другое имя",
        };
      }
    }
  } finally {
    revalidatePath("/collectiions");
  }

  return {
    success: true,
    message: `Коллекция "${validatedFields.data.name}" добавлена`,
  };
}

export async function editCollection(
  id: number,
  _prevState: FormState,
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
      message: "Ошибка при изменении коллекции",
    };
  }

  try {
    await db.collection.update({
      where: {
        id,
      },
      data: {
        name: validatedFields.data.name,
        description: validatedFields.data.description,
        userId: validatedFields.data.userId,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.error(
          "There is a unique constraint violation, a new collection cannot be created with this name",
        );
        return {
          success: false,
          message:
            "Коллекция с таким именем уже существует. Пожалуйста, выберите другое имя",
        };
      }
    }
  }

  redirect(`/collections/${id}`);
}

export async function deleteCollection(id: number) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  const deleteCards = db.card.deleteMany({
    where: {
      collectionId: Number(id),
    },
  });

  const deleteCollection = db.collection.delete({
    where: {
      id: Number(id),
    },
  });

  try {
    await db.$transaction([deleteCards, deleteCollection]);
  } catch (error) {
    console.error("Something went wrong while deleting a collection");
    return {
      message: "Ошибка при удалении коллекции",
    };
  }

  redirect("/collections");
}
