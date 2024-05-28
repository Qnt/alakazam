// import { Home } from "lucide-react";
// import Breadcrumbs from "~/app/_components/ui/breadcrumbs";
import { getCardById } from "~/server/queries";

export default async function Page({
  params,
}: {
  params: { id: string; cardId: string };
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
      {card.question}
    </div>
  );
}
