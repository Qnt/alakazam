import { type Collection } from "@prisma/client";
import Link from "next/link";
import CollectionControls from "./collection-controls";

export default function CollectionCard({
  collection,
}: {
  collection: Collection;
}) {
  return (
    <div className="card card-compact bg-neutral text-neutral-content shadow-xl md:max-w-72">
      <div className="card-body">
        <Link href={`/collections/${collection.id}`} className="link">
          <h2 className="card-title">{collection.name}</h2>
        </Link>
        {collection.description && <p>{collection.description}</p>}
        <CollectionControls collection={collection} />
      </div>
    </div>
  );
}
