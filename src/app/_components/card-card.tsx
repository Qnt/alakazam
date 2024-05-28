import { type Card } from "@prisma/client";
import Link from "next/link";
import { type Collection } from "prisma/generated/zod";

export default function CardCard({
  card,
  collectionId,
}: {
  card: Card;
  collectionId: Collection["id"];
}) {
  return (
    <Link
      href={`/collections/${collectionId}/${card.id}`}
      className="cursor-pointer focus:rounded-2xl"
    >
      <div className="card card-compact h-full w-full bg-neutral text-neutral-content shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{card.question}</h2>
          <p>{card.answer}</p>
        </div>
      </div>
    </Link>
  );
}
