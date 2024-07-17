import { getMaxPinnableCollections } from "~/server/queries";
import CollectionList from "../_components/collection-list";

export default async function HomePage() {
  const maxPinnedCollections = await getMaxPinnableCollections();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">Pinned Collections</h2>
        <p className="text-sm">
          {`Max ${maxPinnedCollections} collections can be pinned at a time`}
        </p>
      </div>
      <CollectionList pinned />
    </div>
  );
}
