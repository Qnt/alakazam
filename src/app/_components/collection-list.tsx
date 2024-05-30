import { getMyCollections } from "~/server/queries";
import CollectionCard from "./collection-card";

export default async function CollectionList() {
  const collections = await getMyCollections();

  return (
    <div className="mt-28 flex flex-col gap-4">
      {collections.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center">
          <p>You don&apos;t have any collections yet.</p>
        </div>
      )}
      {collections.length > 0 && (
        <ul className="flex flex-col gap-4 md:grid md:grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]">
          {collections.map((c) => {
            return <CollectionCard key={c.id} collection={c} />;
          })}
        </ul>
      )}
    </div>
  );
}
