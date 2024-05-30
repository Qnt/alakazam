import { type Collection } from "prisma/generated/zod";
import CollectionEditForm from "~/app/_components/collection-edit-form";
import { getCollectionById } from "~/server/queries";

export default async function Page({
  params,
}: {
  params: { id: Collection["id"] };
}) {
  const collection = await getCollectionById(params.id);

  return (
    <div className="flex flex-col justify-between gap-2 lg:flex-row">
      <CollectionEditForm collection={collection} />
    </div>
  );
}
