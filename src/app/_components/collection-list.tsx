import { type CollectionWhereInputSchema } from "prisma/generated/zod";
import { getMyCollections } from "~/server/queries";
import CollectionCard from "./collection-card";
import ContentGrid from "./ui/content-grid";
import DialogButton from "./ui/dialog-button";

export default async function CollectionList(
  props: Zod.infer<typeof CollectionWhereInputSchema> = {},
) {
  const collections = await getMyCollections(props);
  return (
    <ContentGrid>
      {!props.pinned && (
        <div className="card card-compact border-2 border-dashed border-base-content/10 text-info">
          <div className="card-body">
            <DialogButton variant={{ name: "collection" }}>
              Create a new collection
            </DialogButton>
          </div>
        </div>
      )}
      {collections.map((c) => {
        return <CollectionCard key={c.id} collection={c} />;
      })}
    </ContentGrid>
  );
}
