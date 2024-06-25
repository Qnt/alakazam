import { SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Card } from "prisma/generated/zod";
import ButtonSubmit from "~/app/_components/ui/button-submit";
import { deleteCard, getCardById } from "~/server/queries";

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
    <div className="flex flex-col justify-between gap-2">
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
      <div className="flex max-w-xl flex-col gap-2 self-center">
        <div className="flex flex-col">
          <p>Question:</p>
          <h2 className="text-lg font-semibold">{card.question}</h2>
        </div>
        <div className="flex flex-col">
          <p>Answer:</p>
          <p>{card.answer}</p>
        </div>
      </div>
    </div>
  );
}
