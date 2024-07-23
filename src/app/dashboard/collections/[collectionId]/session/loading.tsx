export default function Loading() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="skeleton h-7 w-32 rounded-lg"></div>
      <div className="flex w-full max-w-xl flex-col items-center gap-10">
        <div className="skeleton h-80 w-full"></div>
        <div className="grid w-full grid-cols-2 gap-2">
          <div className="skeleton h-12 w-full rounded-lg"></div>
          <div className="skeleton h-12 w-full rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
