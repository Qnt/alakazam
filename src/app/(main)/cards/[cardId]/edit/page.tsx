import { type Card } from "prisma/generated/zod";
import CardEditForm from "~/app/_components/card-edit-form";
import { getCardById } from "~/server/queries";

export default async function CardEditPage({
  params,
}: {
  params: { cardId: Card["id"] };
}) {
  const card = await getCardById(params.cardId);

  return <>{card && <CardEditForm card={card} />}</>;
}
