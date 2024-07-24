import ContentGrid from "~/app/_components/ui/content-grid";

export default function Loading() {
  return (
    <ContentGrid>
      <div className="skeleton h-20 w-full sm:h-48"></div>
      <div className="skeleton h-48 w-full"></div>
      <div className="skeleton h-48 w-full"></div>
      <div className="skeleton h-48 w-full"></div>
      <div className="skeleton h-48 w-full"></div>
      <div className="skeleton h-48 w-full"></div>
      <div className="skeleton h-48 w-full"></div>
      <div className="skeleton h-48 w-full"></div>
    </ContentGrid>
  );
}
