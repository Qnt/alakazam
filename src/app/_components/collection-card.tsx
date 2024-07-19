import { type Collection } from "@prisma/client";
import Link from "next/link";
import { getCardsByCollectionId } from "~/server/queries";
import StartSession from "./ui/start-session";

export default async function CollectionCard({
  collection,
}: {
  collection: Collection;
}) {
  const cards = await getCardsByCollectionId(collection.id);

  const hasCards = cards.length > 0;

  return (
    <div className="group stack">
      <div className="card h-full border-2 border-base-content/10 bg-base-200 text-base-content shadow-md transition-all  group-hover:-translate-y-[2%] group-hover:scale-[102%]">
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
              className="btn btn-outline btn-primary w-full"
            >
              Start session
            </StartSession>
          </div>
        </div>
      </div>
      {hasCards && (
        <>
          <div className="card h-full border-2 border-base-content/10 bg-base-200 shadow transition-all group-hover:translate-y-[2%] group-hover:scale-[98%]"></div>
          <div className="card h-full border-2 border-base-content/10 bg-base-200 shadow transition-all group-hover:translate-y-[4%] group-hover:scale-[96%]"></div>
        </>
      )}
    </div>
  );
}
