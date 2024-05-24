import { EllipsisVertical, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import ButtonSubmit from "~/app/_components/ui/button-submit";
import { deleteCollection } from "~/server/actions";
import { getCollectionById } from "~/server/queries";

export default async function Page({ params }: { params: { id: string } }) {
  const collection = await getCollectionById(Number(params.id));

  return (
    <>
      <section className="flex flex-col justify-between gap-2 lg:flex-row">
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
                  <span>Редактировать </span>
                  <SquarePen />
                </Link>
              </li>
              <li>
                <ButtonSubmit className="btn btn-ghost justify-between text-error">
                  <span>Удалить</span>
                  <Trash2 />
                </ButtonSubmit>
              </li>
            </ul>
          </div>
        </form>
        <form>
          <label className="input input-bordered flex items-center gap-2">
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
          {/* <NewCardButton /> */}
        </form>
      </section>
    </>
  );
}
