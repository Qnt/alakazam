import { Home } from "lucide-react";
import Breadcrumbs from "~/app/_components/ui/breadcrumbs";
import { getCollectionById } from "~/server/queries";

export default async function Page({ params }: { params: { id: string } }) {
  const collection = await getCollectionById(Number(params.id));

  return (
    <div className="flex flex-col justify-between gap-2 lg:flex-row">
      <Breadcrumbs
        breadcrumbs={[
          { label: <Home size={20} />, href: "/", active: false },
          { label: "Коллекции", href: "/collections", active: false },
          {
            label: collection.name,
            href: `/collections/${collection.id}`,
            active: false,
          },
          {
            label: "Изменение",
            href: `/collections/${collection.id}/edit`,
            active: true,
          },
        ]}
      />
    </div>
  );
}
