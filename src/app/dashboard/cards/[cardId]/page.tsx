import { ChevronLeft, SquarePen, Trash2 } from "lucide-react";
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
      <div className="flex justify-between gap-2">
        <Link
          href={`/dashboard/collections/${card.collectionId}`}
          className="btn btn-ghost btn-sm justify-center"
        >
          <ChevronLeft size={16} />
          <span>back to collection</span>
        </Link>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/cards/${params.cardId}/edit`}
            className="btn btn-primary btn-sm items-center"
          >
            <SquarePen size={16} />
            <span>Edit</span>
          </Link>
          <form action={deleteCard.bind(null, card)}>
            <ButtonSubmit className="btn btn-error btn-sm items-center">
              <Trash2 size={16} />
              <span>Delete</span>
            </ButtonSubmit>
          </form>
        </div>
      </div>
      <div className="flex max-w-xl flex-col gap-4 self-center">
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
