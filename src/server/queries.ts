"use server";

import { auth } from "@clerk/nextjs/server";
import { Prisma, type Card } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  CardCreateInputSchema,
  CardUpdateInputSchema,
  CollectionCreateWithoutCardsInputSchema,
  CollectionUpdateWithoutCardsInputSchema,
  type Collection,
} from "prisma/generated/zod";
import "server-only";
import { type z } from "zod";
import { db } from "./db";

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
    box?: string[];
  };
};

export async function getMyCollections() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  const collections = await db.collection.findMany({
    where: {
      userId,
    },
    orderBy: {
      id: "desc",
    },
  });

  return collections;
}

export async function getCollectionById(id: Collection["id"]) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  const collection = await db.collection.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (collection?.userId !== userId) {
    throw new Error("Unauthorized access");
  }

  if (!collection) {
    throw new Error("Collection not found");
  }

  return collection;
}

export async function getCardsByCollectionId(id: Collection["id"]) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  const cards = await db.card.findMany({
    where: {
      collectionId: id,
    },
  });

  return cards;
}

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
      console.error("An unexpected error occurred: ", error);
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }

  revalidatePath("/collections");

  return {
    success: true,
    message: `The "${validatedFields.data.name}" collection has been added`,
  };
}

export async function updateCollection(
  id: Collection["id"],
  _prevState: FormState,
  formData: FormData,
) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  const description = formData.get("description");

  const validatedFields = CollectionUpdateWithoutCardsInputSchema.safeParse({
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
          "There is a unique constraint violation, a collection with this name already exists.",
        );
        return {
          success: false,
          message:
            "A collection with this name already exists. Please choose another name",
        };
      }
      console.error("An unexpected error occurred: ", error);
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }

  redirect(`/collections/${id}`);
}

export async function deleteCollection(id: Collection["id"]) {
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

export async function createCard(
  collectionId: Collection["id"],
  _prevState: FormState,
  formData: FormData,
) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  const validatedFields = CardCreateInputSchema.safeParse({
    question: formData.get("question"),
    answer: formData.get("answer"),
    box: formData.get("box"),
    collection: { connect: { id: collectionId } },
    userId: userId,
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
        userId: validatedFields.data.userId,
        collection: validatedFields.data.collection,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.error(
          "There is a unique constraint violation, a new card cannot be created with this question",
        );
        return {
          success: false,
          message:
            "A card with this question already exists. Please choose another question",
        };
      }
      console.error("An unexpected error occurred: ", error);
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }

  revalidatePath(`/collections/${collectionId}`);

  return {
    success: true,
    message: `The card has been added`,
  };
}

export async function updateCard(
  cardId: Card["id"],
  collectionId: Collection["id"],
  _prevState: FormState,
  formData: FormData,
) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  const validatedFields = CardUpdateInputSchema.safeParse({
    question: formData.get("question"),
    answer: formData.get("answer"),
    box: formData.get("box"),
    userId: userId,
    collection: { connect: { id: collectionId } },
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "An error occurred while changing a card",
    };
  }

  try {
    await db.card.update({
      where: {
        id: cardId,
      },
      data: {
        question: validatedFields.data.question,
        answer: validatedFields.data.answer,
        box: validatedFields.data.box,
        collection: validatedFields.data.collection,
        userId: validatedFields.data.userId,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.error(
          "There is a unique constraint violation, a card with this question already exists",
        );
        return {
          success: false,
          message:
            "A card with this question already exists. Please choose another question",
        };
      }
      console.error("An unexpected error occurred: ", error);
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }

  redirect(`/collections/${collectionId}`);
}

export async function getCardById(id: Card["id"]) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  const card = await db.card.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (card?.userId !== userId) {
    throw new Error("Unauthorized access");
  }

  if (!card) {
    throw new Error("Card not found");
  }

  return card;
}

export async function deleteCard(card: Card) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  try {
    await db.card.delete({
      where: {
        id: card.id,
      },
    });
  } catch (error) {
    console.error("Something went wrong while deleting a card");
    return {
      message: "An error occurred while deleting a card",
    };
  }

  redirect(`/collections/${card.collectionId}`);
}
