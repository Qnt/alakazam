import { Collection } from "@prisma/client";

type CollectionCardProps = {
  collection: Collection;
};

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <div className="card card-compact bg-neutral text-neutral-content shadow-xl md:max-w-72">
      <div className="card-body">
        <h2 className="card-title">{collection.name}</h2>
        <p className="text-wrap">{collection.userId}</p>
        {collection.description && <p>{collection.description}</p>}
        <div className="card-actions justify-center">
          <button className="btn btn-accent">Начать</button>
        </div>
      </div>
    </div>
  );
}
