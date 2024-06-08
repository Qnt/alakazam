import { type Collection } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { getCardsByCollectionId } from "~/server/queries";

export default async function StartSession({
  collectionId,
}: {
  collectionId: Collection["id"];
}) {
  const cards = await getCardsByCollectionId(collectionId);

  return (
    <Link
      href={`/collections/${collectionId}/session`}
      className={clsx("btn btn-primary", cards.length === 0 && "btn-disabled")}
    >
      Start session
    </Link>
  );
}
