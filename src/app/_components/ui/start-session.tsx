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
    <>
      {hasCards ? (
        <Link className="w-full" href={`/collections/${collectionId}/session`}>
          <div className={`flex items-center ${className}`}>
            <Play />
            {children}
          </div>
        </Link>
      ) : (
        <div className={`btn-disabled flex items-center ${className}`}>
          <Play />
          {children}
        </div>
      )}
    </>
  );
}
