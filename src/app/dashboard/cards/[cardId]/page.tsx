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
  console.log(card);
  return (
    <div className="flex flex-col justify-between gap-4">
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
            className="btn btn-primary btn-sm flex-nowrap items-center"
          >
            <SquarePen size={16} />
            <span className="hidden md:block">Edit</span>
          </Link>
          <form action={deleteCard.bind(null, card)}>
            <ButtonSubmit className="btn btn-error btn-sm flex-nowrap items-center">
              <Trash2 size={16} />
              <span className="hidden md:block">Delete</span>
            </ButtonSubmit>
          </form>
        </div>
      </div>
      <div className="card mx-auto max-w-xl bg-base-200 shadow-md">
        <div className="card-body">
          <h2 className="card-title">{card.question}</h2>
          <p className="pb-4">{card.answer}</p>
          <div className="grid grid-cols-2 gap-2">
            <p>Box:</p>
            <div className="badge badge-outline lowercase">{card.box}</div>
            <p>Created:</p>
            <div className="">{card.createdAt.toLocaleString()}</div>
            <p>Updated:</p>
            <div className="">{card.updatedAt.toLocaleString()}</div>
            <p>Last answered:</p>
            <div className="">
              {card.lastAnswered ? card.lastAnswered.toLocaleString() : "never"}
            </div>
            <p>Correct answers:</p>
            <div className="">{card.answeredCorrectly}</div>
            <p>Incorrect answers:</p>
            <div className="">{card.answeredWrongly}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
