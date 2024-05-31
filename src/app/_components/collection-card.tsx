import { type Collection } from "@prisma/client";
import Link from "next/link";

export default function CollectionCard({
  collection,
}: {
  collection: Collection;
}) {
  return (
    <div className="card card-compact h-full w-full bg-base-200 text-base-content shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{collection.name}</h2>
        {collection.description && (
          <p className="text-sm italic text-base-content/70">
            {collection.description}
          </p>
        )}
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href={`/collections/${collection.id}`}
            className="btn btn-outline"
          >
            View collection
          </Link>

          <Link
            href={`/collections/${collection.id}/session`}
            className="btn btn-primary"
          >
            Start session
          </Link>
        </div>
      </div>
    </div>
  );
}
