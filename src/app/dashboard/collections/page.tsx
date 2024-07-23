import { Suspense } from "react";
import CollectionList from "../../_components/collection-list";
import Loading from "./loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CollectionList />
    </Suspense>
  );
}
