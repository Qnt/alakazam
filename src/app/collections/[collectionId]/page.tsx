import { EllipsisVertical, Home, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import CardList from "~/app/_components/card-list";
import NewCardButton from "~/app/_components/new-card-button";
import Breadcrumbs from "~/app/_components/ui/breadcrumbs";
import ButtonSubmit from "~/app/_components/ui/button-submit";
import { deleteCollection, getCollectionById } from "~/server/queries";

export default async function CollectionPage({
  params,
}: {
  params: { collectionId: string };
}) {
  console.log(params);
  const collection = await getCollectionById(params.collectionId);

  return (
    <div className="flex flex-col justify-between gap-2 lg:flex-row">
      <Breadcrumbs
        breadcrumbs={[
          { label: <Home size={20} />, href: "/", active: false },
          { label: "Collections", href: "/collections", active: false },
          {
            label: collection.name,
            href: `/collections/${collection.id}`,
            active: true,
          },
        ]}
      />
      <div className="flex gap-2">
        <form className="form-control grow">
          <label className="input input-bordered flex grow items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
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
          </label>
        </form>
        <NewCardButton collectionId={collection.id} />
      </div>
      <form
        className="flex items-center justify-between gap-4"
        action={deleteCollection.bind(null, collection.id)}
      >
        <h2 className="grow overflow-hidden whitespace-nowrap p-2 text-xl font-bold">
          {collection.name}
        </h2>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
            <EllipsisVertical />
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
              <ButtonSubmit className="btn btn-ghost justify-between text-error">
                <span>Delete</span>
                <Trash2 />
              </ButtonSubmit>
            </li>
          </ul>
        </div>
      </form>
      <CardList collectionId={params.collectionId} />
    </div>
  );
}
