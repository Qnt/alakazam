import { Collection } from "@prisma/client";
import Link from "next/link";

type CollectionCardProps = {
  collection: Collection;
};

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={`/collections/${collection.id}`} className="cursor-pointer">
      <div className="card card-compact bg-neutral text-neutral-content shadow-xl md:max-w-72">
        <div className="card-body">
          <h2 className="card-title">{collection.name}</h2>
          {collection.description && <p>{collection.description}</p>}
          {/* <div className="card-actions justify-center">
            <button className="btn btn-accent">Начать</button>
          </div> */}
        </div>
      </div>
    </Link>
  );
}
