export default function Loading() {
  return (
    <div className="flex flex-col justify-between gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="skeleton h-8 w-48 rounded-lg"></div>
        <div className="skeleton h-12 w-14 rounded-lg"></div>
      </div>
      <div className="skeleton mx-auto h-96 w-[36rem]"></div>
    </div>
  );
}
