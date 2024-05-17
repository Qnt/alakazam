import { getMyCollections } from "~/server/queries";
import CollectionCard from "./collection-card";
import NewCollectionModal from "./new-collection-modal";

export default async function CollectionList() {
  const collections = await getMyCollections();

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-4">
        {collections.map((c) => {
          return <CollectionCard key={c.id} collection={c} />;
        })}
      </ul>
      <NewCollectionModal />
    </div>
  );
}
