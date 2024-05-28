"use server";

import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  CardCreateInputSchema,
  CollectionCreateWithoutCardsInputSchema,
} from "prisma/generated/zod";
import { type z } from "zod";
import { db } from "~/server/db";

CollectionCreateWithoutCardsInputSchema satisfies z.ZodType<Prisma.CollectionCreateWithoutCardsInput>;
CardCreateInputSchema satisfies z.ZodType<Prisma.CardCreateInput>;

type FormState = {
  success: boolean;
  message?: string | null;
};

export type CollectionFormState = FormState & {
  errors?: {
    name?: string[];
  };
};

export type CardFormState = FormState & {
  errors?: {
    question?: string[];
    answer?: string[];
  };
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

  const validatedFields = CollectionCreateWithoutCardsInputSchema.safeParse({
    name: formData.get("name"),
    description: description === "" ? null : description,
    userId,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "An error occurred while creating a collection",
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
            "A collection with this name already exists. Please choose another name",
        };
      }
    }
  } finally {
    revalidatePath("/collectiions");
  }

  return {
    success: true,
    message: `The "${validatedFields.data.name}" collection has been added`,
  };
}

export async function editCollection(
  id: string,
  _prevState: FormState,
  formData: FormData,
) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  const description = formData.get("description");

  const validatedFields = CollectionCreateWithoutCardsInputSchema.safeParse({
    name: formData.get("name"),
    description: description === "" ? null : description,
    userId,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "An error occurred while changing a collections",
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
            "A collection with this name already exists. Please choose another name",
        };
      }
    }
  }

  redirect(`/collections/${id}`);
}

export async function deleteCollection(id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  const deleteCards = db.card.deleteMany({
    where: {
      collectionId: id,
    },
  });

  const deleteCollection = db.collection.delete({
    where: {
      id: id,
    },
  });

  try {
    await db.$transaction([deleteCards, deleteCollection]);
  } catch (error) {
    console.error("Something went wrong while deleting a collection");
    return {
      message: "An error occurred while deleting a collection",
    };
  }

  redirect("/collections");
}

export async function createCard(_prevState: FormState, formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  const validatedFields = CardCreateInputSchema.safeParse({
    question: formData.get("question"),
    answer: formData.get("answer"),
    box: formData.get("box"),
    collection: formData.get("collection"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "An error occurred while creating a card",
    };
  }

  try {
    await db.card.create({
      data: {
        question: validatedFields.data.question,
        answer: validatedFields.data.answer,
        box: validatedFields.data.box,
        collection: validatedFields.data.collection,
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
            "A card with this question already exists. Please choose another question",
        };
      }
    }
  } finally {
    revalidatePath("/collectiions");
  }

  return {
    success: true,
    message: `The card has been added`,
  };
}
