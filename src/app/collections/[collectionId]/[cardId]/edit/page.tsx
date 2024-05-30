import { type Card, type Collection } from "prisma/generated/zod";
import CardEditForm from "~/app/_components/card-edit-form";
import { getCardById } from "~/server/queries";

export default async function CardEditPage({
  params,
}: {
  params: { collectionId: Collection["id"]; cardId: Card["id"] };
}) {
  const card = await getCardById(params.cardId);

  return (
    <div className="flex flex-col justify-between gap-2 lg:flex-row">
      <CardEditForm card={card} collectionId={params.collectionId} />
    </div>
  );
}
