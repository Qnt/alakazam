// import { Home } from "lucide-react";
// import Breadcrumbs from "~/app/_components/ui/breadcrumbs";
import { EllipsisVertical, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import ButtonSubmit from "~/app/_components/ui/button-submit";
import { deleteCard, getCardById } from "~/server/queries";

export default async function CardPage({
  params,
}: {
  params: { collectionId: string; cardId: string };
}) {
  const card = await getCardById(params.cardId);

  return (
    <div className="flex flex-col justify-between gap-2 lg:flex-row">
      {/* <Breadcrumbs
        breadcrumbs={[
          { label: <Home size={20} />, href: "/", active: false },
          { label: "Collections", href: "/collections", active: false },
          {
            label: params,
            href: `/collections/${params.id}`,
            active: true,
          },
          {
            label: params.cardId,
            href: `/collections/${card.collectionId}/card/${card.id}`,
            active: true,
          },
        ]}
      /> */}
      <form
        className="flex justify-end gap-4"
        action={deleteCard.bind(null, card)}
      >
        <Link
          href={`/collections/${params.collectionId}/${params.cardId}/edit`}
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
