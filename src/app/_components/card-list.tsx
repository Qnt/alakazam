import { getCardsByCollectionId } from "~/server/queries";
import CardCard from "./card-card";

export default async function CardList({
  collectionId,
}: {
  collectionId: string;
}) {
  const cards = await getCardsByCollectionId(collectionId);

  return (
    <div className="flex flex-col gap-4">
      {cards.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center">
          <p>Коллекция пуста.</p>
        </div>
      )}
      {cards.length > 0 && (
        <ul>
          {cards.map((c) => (
            <li key={c.id}>
              <CardCard card={c} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
