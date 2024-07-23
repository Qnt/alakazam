import ContentGrid from "../_components/ui/content-grid";

export default function Loading() {
  return (
    <ContentGrid>
      <div className="skeleton h-48 w-full"></div>
      <div className="skeleton h-48 w-full"></div>
      <div className="skeleton h-48 w-full"></div>
    </ContentGrid>
  );
}
