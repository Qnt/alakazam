import "server-only";
import { db } from "./db";

//TODO: add user based query
export async function getMyCollections() {
  const collections = await db.collection.findMany();

  return collections;
}
