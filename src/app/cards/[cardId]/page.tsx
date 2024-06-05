import { SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { type Card } from "prisma/generated/zod";
import ButtonSubmit from "~/app/_components/ui/button-submit";
import { deleteCard, getCardById } from "~/server/queries";
import { notFound } from "next/navigation";

export default async function CardPage({
  params,
}: {
  params: { cardId: Card["id"] };
}) {
  const card = await getCardById(params.cardId);

  if (!card) {
    notFound();
  }

  return (
    <div className="flex flex-col justify-between gap-2 lg:flex-row">
      <form
        className="flex justify-end gap-4"
        action={deleteCard.bind(null, card)}
      >
        <Link
          href={`/cards/${params.cardId}/edit`}
          className="btn btn-primary btn-sm items-center"
        >
          <SquarePen size={16} />
          <span>Edit</span>
        </Link>
        <ButtonSubmit className="btn btn-error btn-sm items-center">
          <Trash2 size={16} />
          <span>Delete</span>
        </ButtonSubmit>
      </form>
      {card.question}
    </div>
  );
}
