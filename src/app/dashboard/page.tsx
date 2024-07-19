import { getMaxPinnableCollections } from "~/server/queries";
import CollectionList from "../_components/collection-list";

export default async function DashboardPage() {
  const maxPinnedCollections = await getMaxPinnableCollections();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Pinned Collections</h2>
        <p className="text-sm">
          {`Max ${maxPinnedCollections} collections can be pinned at a time`}
        </p>
      </header>
      <CollectionList pinned />
    </div>
  );
}
