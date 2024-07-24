import { ChevronLeft, Ellipsis, SquarePen, Trash2 } from "lucide-react";
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
    <div className="flex flex-col justify-between gap-4">
      <div className="flex items-center justify-between gap-2">
        <Link
          href={`/collections/${card.collectionId}`}
          className="btn btn-ghost btn-sm justify-center"
        >
          <ChevronLeft size={16} />
          <span>back to collection</span>
        </Link>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-outline">
            <Ellipsis />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-52 rounded-box border-2 border-base-content/10 bg-base-300 p-2 shadow"
          >
            <li>
              <Link
                href={`/cards/${params.cardId}/edit`}
                className="btn btn-ghost justify-between"
              >
                <span>Edit</span>
                <SquarePen />
              </Link>
            </li>
            <li>
              <form
                className="btn btn-ghost justify-between"
                action={deleteCard.bind(null, card)}
              >
                <ButtonSubmit
                  className="flex grow items-center justify-between text-error"
                  name="delete"
                  value="delete"
                >
                  <span>Delete</span>
                  <Trash2 />
                </ButtonSubmit>
              </form>
            </li>
          </ul>
        </div>
      </div>
      <div className="card mx-auto max-w-xl border-2 border-base-content/10 bg-base-200 shadow-md">
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
