import { type Collection } from "@prisma/client";
import Link from "next/link";

export default function CollectionCard({
  collection,
}: {
  collection: Collection;
}) {
  return (
    <Link
      href={`/collections/${collection.id}`}
      className="cursor-pointer focus:rounded-2xl"
    >
      <div className="stack w-full">
        <div className="card card-compact h-full w-full bg-base-300 text-base-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{collection.name}</h2>
            {collection.description && <p>{collection.description}</p>}
          </div>
        </div>
        <div className="card card-compact h-full w-full bg-base-300 text-base-content shadow"></div>
        <div className="card card-compact h-full w-full bg-base-300 text-base-content shadow-sm"></div>
      </div>
    </Link>
  );
}
