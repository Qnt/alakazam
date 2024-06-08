import { type Collection } from "prisma/generated/zod";
import { getCardsByCollectionId } from "~/server/queries";
import CardCard from "./card-card";

export default async function CardList({
  collectionId,
}: {
  collectionId: Collection["id"];
}) {
  const cards = await getCardsByCollectionId(collectionId);

  return (
    <div className="flex flex-col">
      <h2 className="grow overflow-hidden whitespace-nowrap p-2 text-xl font-bold">
        Cards
      </h2>
      <div className="flex flex-col gap-4">
        {cards.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center">
            <p>There are no cards in the collection yet</p>
          </div>
        )}
        {cards.length > 0 && (
          // <ul className="flex flex-col gap-4 md:grid md:grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]">
          <ul className="w-md md:w-none flex flex-col gap-4 md:grid md:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
            {cards.map((c) => (
              <li key={c.id}>
                <CardCard card={c} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
