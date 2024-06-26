import { type CollectionWhereInputSchema } from "prisma/generated/zod";
import { getMyCollections } from "~/server/queries";
import CollectionCard from "./collection-card";

export default async function CollectionList(
  props: Zod.infer<typeof CollectionWhereInputSchema> = {},
) {
  const collections = await getMyCollections(props);

  return (
    <>
      {collections.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center">
          <p>You don&apos;t have any collections yet.</p>
        </div>
      )}
      {collections.length > 0 && (
        <ul className="w-md md:w-none flex flex-col gap-4 md:grid md:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
          {collections.map((c) => {
            return <CollectionCard key={c.id} collection={c} />;
          })}
        </ul>
      )}
    </>
  );
}
