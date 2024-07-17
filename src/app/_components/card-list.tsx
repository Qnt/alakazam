import { type Collection } from "prisma/generated/zod";
import { getCardsByCollectionId } from "~/server/queries";
import CardCard from "./card-card";
import NewCardButton from "./new-card-button";

export default async function CardList({
  collectionId,
}: {
  collectionId: Collection["id"];
}) {
  const cards = await getCardsByCollectionId(collectionId);

  return (
    <ul className="w-md md:w-none flex flex-col gap-4 md:grid md:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
      <div className="card card-compact border-2 border-dashed border-info text-info">
        <div className="card-body">
          <NewCardButton collectionId={collectionId} />
        </div>
      </div>
      {cards.map((c) => (
        <li key={c.id}>
          <CardCard card={c} />
        </li>
      ))}
    </ul>
  );
}
