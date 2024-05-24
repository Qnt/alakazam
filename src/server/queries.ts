import { auth } from "@clerk/nextjs/server";
import "server-only";
import { db } from "./db";

export async function getMyCollections() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
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

export async function getCollectionById(id: number) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
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
