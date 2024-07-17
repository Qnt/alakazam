import { type CollectionWhereInputSchema } from "prisma/generated/zod";
import { getMyCollections } from "~/server/queries";
import CollectionCard from "./collection-card";
import NewCollectionButton from "./new-collection-button";

export default async function CollectionList(
  props: Zod.infer<typeof CollectionWhereInputSchema> = {},
) {
  const collections = await getMyCollections(props);
  return (
    <ul className="w-md md:w-none flex flex-col gap-4 md:grid md:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
      {!props.pinned && (
        <div className="card card-compact border-2 border-dashed border-info text-info">
          <div className="card-body">
            <NewCollectionButton />
          </div>
        </div>
      )}
      {collections.map((c) => {
        return <CollectionCard key={c.id} collection={c} />;
      })}
    </ul>
  );
}
