import { type Collection } from "prisma/generated/zod";
import { getCardsByCollectionId } from "~/server/queries";
import CardCard from "./card-card";
import NewCardButton from "./new-card-button";
import ContentGrid from "./ui/content-grid";

export default async function CardList({
  collectionId,
}: {
  collectionId: Collection["id"];
}) {
  const cards = await getCardsByCollectionId(collectionId);

  return (
    <ContentGrid>
      <div className="card card-compact border-2 border-dashed border-base-content/10 text-info">
        <div className="card-body">
          <NewCardButton collectionId={collectionId} />
        </div>
      </div>
      {cards.map((c) => (
        <CardCard key={c.id} card={c} />
      ))}
    </ContentGrid>
  );
}
