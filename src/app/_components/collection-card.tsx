import { type Collection } from "@prisma/client";
import Link from "next/link";
import StartSession from "./ui/start-session";

export default function CollectionCard({
  collection,
}: {
  collection: Collection;
}) {
  return (
    <div className="card card-compact bg-base-200 text-base-content shadow-md">
      <div className="card-body justify-between">
        <Link
          className="link-hover link"
          href={`/dashboard/collections/${collection.id}`}
        >
          <h2 className="card-title">{collection.name}</h2>
        </Link>
        {collection.description && (
          <p className="text-sm italic text-base-content/70">
            {collection.description}
          </p>
        )}
        <div className="flex justify-center gap-4 pt-4">
          <StartSession
            collectionId={collection.id}
            className="btn btn-primary w-full"
          >
            Start session
          </StartSession>
        </div>
      </div>
    </div>
  );
}
