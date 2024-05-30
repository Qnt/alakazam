import CollectionList from "../_components/collection-list";
import NewCollectionButton from "../_components/new-collection-button";

export default function Page() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 bg-base-100 pb-2">
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
          <NewCollectionButton />
        </div>
      </div>
      <CollectionList />
    </div>
  );
}
