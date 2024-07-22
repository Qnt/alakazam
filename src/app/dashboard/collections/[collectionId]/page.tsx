import { Ellipsis, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Collection } from "prisma/generated/zod";
import CardList from "~/app/_components/card-list";
import CollectionPin from "~/app/_components/collection-pin";
import ButtonSubmit from "~/app/_components/ui/button-submit";
import StartSession from "~/app/_components/ui/start-session";
import {
  deleteCollection,
  getCollectionById,
  isPinnable,
} from "~/server/queries";

export default async function CollectionPage({
  params,
}: {
  params: { collectionId: Collection["id"] };
}) {
  const collection = await getCollectionById(params.collectionId);

  if (!collection) {
    notFound();
  }

  return (
    <div className="flex flex-col justify-between gap-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="truncate p-2 text-xl font-bold">{collection.name}</h2>
        <div className="flex items-center justify-end gap-2">
          <StartSession
            collectionId={params.collectionId}
            className="btn btn-primary"
          >
            <span className="hidden md:inline">Start session</span>
          </StartSession>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-outline">
              <Ellipsis />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-52 rounded-box bg-base-200 p-2 shadow"
            >
              <li>
                <Link
                  href={`/dashboard/collections/${collection.id}/edit`}
                  className="btn btn-ghost justify-between"
                >
                  <span>Edit</span>
                  <SquarePen />
                </Link>
              </li>
              <li>
                <CollectionPin
                  isPinnable={!(await isPinnable()) && !collection.pinned}
                  collection={collection}
                />
              </li>
              <li>
                <form
                  className="btn btn-ghost justify-between"
                  action={async () => {
                    "use server";
                    await deleteCollection(collection.id);
                  }}
                >
                  <ButtonSubmit
                    className="flex grow items-center justify-between text-error"
                    name="delete"
                    value="delete"
                  >
                    <span>Delete</span>
                    <Trash2 />
                  </ButtonSubmit>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <CardList collectionId={params.collectionId} />
    </div>
  );
}
