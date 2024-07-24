import { Suspense } from "react";
import CollectionList from "../../_components/collection-list";
import Loading from "./loading";

export default async function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Pinned Collections</h2>
      </header>
      <Suspense fallback={<Loading />}>
        <CollectionList pinned />
      </Suspense>
    </div>
  );
}
