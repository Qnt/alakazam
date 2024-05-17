import "server-only";
import { db } from "./db";

export async function getMyCollections() {
  const collections = await db.collection.findMany();

  return collections;
}
