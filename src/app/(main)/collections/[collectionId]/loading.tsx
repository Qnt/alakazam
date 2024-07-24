import ContentGrid from "~/app/_components/ui/content-grid";

export default function Loading() {
  return (
    <div className="flex flex-col justify-between gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="skeleton h-12 w-60 rounded-lg"></div>
        <div className="flex items-center justify-end gap-2">
          <div className="skeleton h-12 w-14 rounded-lg md:w-40"></div>
          <div className="skeleton h-12 w-14 rounded-lg"></div>
        </div>
      </div>
      <ContentGrid>
        <div className="skeleton h-20 w-full sm:h-64"></div>
        <div className="skeleton h-64 w-full"></div>
        <div className="skeleton h-64 w-full"></div>
        <div className="skeleton h-64 w-full"></div>
        <div className="skeleton h-64 w-full"></div>
        <div className="skeleton h-64 w-full"></div>
        <div className="skeleton h-64 w-full"></div>
        <div className="skeleton h-64 w-full"></div>
      </ContentGrid>
    </div>
  );
}
