import { getMyCollections } from "~/server/queries";
import CollectionCard from "./collection-card";
import NewCollectionButton from "./new-collection-button";

export default async function CollectionList() {
  const collections = await getMyCollections();

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-4">
        {collections.map((c) => {
          return <CollectionCard key={c.id} collection={c} />;
        })}
      </ul>
      <NewCollectionButton />
    </div>
  );
}
