import { auth } from "@clerk/nextjs/server";
import "server-only";
import { db } from "./db";

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

export async function getCollectionById(id: string) {
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

  if (!collection) {
    throw new Error("Collection not found");
  }

  return collection;
}

export async function getCardsByCollectionId(id: string) {
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
