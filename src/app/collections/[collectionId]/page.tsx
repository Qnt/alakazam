import { Ellipsis, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Collection } from "prisma/generated/zod";
import CardList from "~/app/_components/card-list";
import CollectionPin from "~/app/_components/collection-pin";
import NewCardButton from "~/app/_components/new-card-button";
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
    <div className="flex flex-col justify-between gap-2">
      <div className="flex items-center justify-between gap-4">
        <h2 className="truncate p-2 text-xl font-bold">{collection.name}</h2>
        <div className="flex items-center justify-end gap-2">
          <StartSession
            collectionId={params.collectionId}
            className="btn btn-primary tooltip tooltip-left"
          >
            <span className="hidden md:inline">Start session</span>
          </StartSession>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-outline">
              <Ellipsis />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <Link
                  href={`/collections/${collection.id}/edit`}
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
                    className="btn btn-ghost justify-between text-error"
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

      <div className="flex gap-2">
        <form className="form-control grow">
          <label className="input input-bordered flex grow items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <input type="text" className="grow" placeholder="Search" />
          </label>
        </form>
        <NewCardButton collectionId={collection.id} />
      </div>

      <CardList collectionId={params.collectionId} />
    </div>
  );
}
