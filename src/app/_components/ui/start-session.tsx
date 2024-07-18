import { type Collection } from "@prisma/client";
import { Play } from "lucide-react";
import Link from "next/link";
import { getCardsByCollectionId } from "~/server/queries";

type StartSessionProps = {
  collectionId: Collection["id"];
  className?: string;
  children?: React.ReactNode;
};

export default async function StartSession({
  collectionId,
  className,
  children,
}: StartSessionProps) {
  const cards = await getCardsByCollectionId(collectionId);

  const hasCards = cards.length > 0;

  return (
    <div
      className={`flex items-center ${className} ${!hasCards && "btn-disabled"}`}
    >
      <Link
        className="flex items-center"
        href={`/dashboard/collections/${collectionId}/session`}
      >
        <Play />
        {children}
      </Link>
    </div>
  );
}
