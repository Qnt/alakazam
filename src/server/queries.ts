"use server";

import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  BoxSchema,
  CardCreateInputSchema,
  CardUpdateInputSchema,
  CollectionCreateWithoutCardsInputSchema,
  CollectionUpdateWithoutCardsInputSchema,
  type Card,
  type Collection,
  type CollectionWhereInputSchema,
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

const MAX_PINNED_COLLECTIONS = 3;

export async function getMyCollections(
  args: z.infer<typeof CollectionWhereInputSchema> = {},
) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }
  const collections = await db.collection.findMany({
    where: {
      ...args,
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

  try {
    const collection = await db.collection.findFirst({
      where: {
        id,
        userId,
      },
    });
    return collection;
  } catch (error) {
    console.error("Something went wrong while getting a collection");
  }
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

  revalidatePath("dashboard/collections");

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

  redirect(`/dashboard/collections/${id}`);
}

export async function deleteCollection(id: Collection["id"]) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  const deleteCards = db.card.deleteMany({
    where: {
      collectionId: id,
      userId,
    },
  });

  const deleteCollection = db.collection.delete({
    where: {
      id: id,
      userId,
    },
  });

  try {
    await db.$transaction([deleteCards, deleteCollection]);
  } catch (error) {
    console.error("Something went wrong while deleting a collection");
    return {
      message: "An error occurred while deleting a collection",
      success: false,
    };
  }

  redirect("/collections");
}

export async function getMaxPinnableCollections() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  return MAX_PINNED_COLLECTIONS;
}

export async function isPinnable() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  try {
    const count = await db.collection.count({
      where: {
        pinned: true,
        userId,
      },
    });
    return count < MAX_PINNED_COLLECTIONS;
  } catch (error) {
    console.error("Something went wrong while checking if pinnable");
    return false;
  }
}

export async function toggleCollectionPin(
  id: Collection["id"],
  _prevState: { success: boolean; message: string; isPinned?: boolean },
) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  const currentCollection = await getCollectionById(id);

  if (currentCollection) {
    if (!currentCollection.pinned && !(await isPinnable())) {
      return {
        success: false,
        message:
          "You can only pin up to 3 collections at a time. Please unpin some collections first.",
      };
    }

    try {
      await db.collection.update({
        where: {
          id,
          userId,
        },
        data: {
          pinned: !currentCollection.pinned,
        },
      });
    } catch (error) {
      console.error(
        `Something went wrong while ${currentCollection.pinned ? "unpinning" : "pinning"} a collection`,
      );
      return {
        message: `An error occurred while ${currentCollection.pinned ? "unpinning" : "pinning"} a collection`,
        success: false,
      };
    }

    revalidatePath(`/dashboard/collections/${id}`);

    return {
      success: true,
      message: `The collection has been ${currentCollection.pinned ? "unpinned" : "pinned"}`,
      isPinned: !currentCollection.pinned,
    };
  }

  revalidatePath(`/dashboard/collections/${id}`);

  return {
    success: false,
    message: "Collection not found",
  };
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

  revalidatePath(`/dashboard/collections/${collectionId}`);

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
        updatedAt: new Date(),
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

  redirect(`/dashboard/collections/${collectionId}`);
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
        userId,
      },
    });
  } catch (error) {
    console.error("Something went wrong while deleting a card");
    return {
      success: false,
      message: "An error occurred while deleting a card",
    };
  }

  redirect(`/dashboard/collections/${card.collectionId}`);
}

export async function getSessions(collectionId: Collection["id"]) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  const currentSession = await db.collection.findFirst({
    where: {
      id: collectionId,
      userId,
    },
    select: {
      sessions: true,
    },
  });

  if (!currentSession) {
    throw new Error("Session not found");
  }

  return currentSession.sessions;
}

export async function getCurrentSession(collectionId: Collection["id"]) {
  const sessions = await getSessions(collectionId);
  return sessions + 1;
}

export async function getCardsForSession(
  collectionId: Collection["id"],
  currentSession: Collection["sessions"],
) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  const boxesToGet: Card["box"][] = ["BEGINNER"];
  if (currentSession % 3 === 0) {
    boxesToGet.push("INTERMEDIATE");
  }
  if (currentSession % 5 === 0) {
    boxesToGet.push("ADVANCED");
  }

  try {
    const cards = await db.card.findMany({
      where: {
        collectionId,
        userId,
        box: {
          in: boxesToGet,
        },
      },
    });
    return cards;
  } catch (error) {
    console.error("Something went wrong while getting cards for session");
  }
}

export async function promoteCard(card: Card) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  const newBox =
    card.box === BoxSchema.options[BoxSchema.options.length - 1]
      ? card.box
      : BoxSchema.options[BoxSchema.options.indexOf(card.box) + 1];

  try {
    await db.card.update({
      where: {
        id: card.id,
      },
      data: {
        lastAnswered: new Date(),
        answeredCorrectly: card.answeredCorrectly + 1,
        box: newBox,
      },
    });

    return {
      success: true,
      message: "The card has been promoted",
    };
  } catch (error) {
    console.error("Something went wrong while promoting the card", error);
    return {
      success: false,
      message: "An error occurred while promoting the card",
    };
  }
}

export async function demoteCard(card: Card) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  try {
    await db.card.update({
      where: {
        id: card.id,
      },
      data: {
        lastAnswered: new Date(),
        box: BoxSchema.options[0],
        answeredWrongly: card.answeredWrongly + 1,
      },
    });

    return {
      success: true,
      message: "The card has been demoted",
    };
  } catch (error) {
    console.error("Something went wrong while demoting the card", error);
    return {
      success: false,
      message: "An error occurred while demoting the card",
    };
  }
}

export async function nextSession(collectionId: Collection["id"]) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to perform this action");
  }

  const currentSession = await getCurrentSession(collectionId);

  try {
    await db.collection.update({
      where: {
        id: collectionId,
        userId,
      },
      data: {
        sessions: currentSession,
      },
    });

    revalidatePath(`/dashboard/collections/${collectionId}/session`);
  } catch (error) {
    console.error("Something went wrong while updating the session", error);
    return {
      success: false,
      message: "An error occurred while updating the session",
    };
  }

  return {
    success: true,
    message: "The session has been updated",
  };
}
