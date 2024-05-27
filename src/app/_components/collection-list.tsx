import { getMyCollections } from "~/server/queries";
import CollectionCard from "./collection-card";

export default async function CollectionList() {
  const collections = await getMyCollections();

  return (
    <div className="mt-20 flex flex-col gap-4">
      {collections.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center">
          <p>Список коллекций пуст.</p>
        </div>
      )}
      {collections.length > 0 && (
        //grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3
        <ul className="flex flex-col gap-4 md:grid md:grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] ">
          {collections.map((c) => {
            return <CollectionCard key={c.id} collection={c} />;
          })}
        </ul>
      )}
    </div>
  );
}
