import { Home } from "lucide-react";
import CardEditForm from "~/app/_components/card-edit-form";
// import Breadcrumbs from "~/app/_components/ui/breadcrumbs";
import { getCardById } from "~/server/queries";

export default async function CardEditPage({
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
            label: collection.name,
            href: `/collections/${collection.id}`,
            active: false,
          },
          {
            label: "Edit",
            href: `/collections/${collection.id}/edit`,
            active: true,
          },
        ]}
      /> */}
      <CardEditForm card={card} collectionId={params.collectionId} />
    </div>
  );
}
