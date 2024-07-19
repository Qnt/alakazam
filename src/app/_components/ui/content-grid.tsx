export default function ContentGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex flex-col gap-6 sm:grid sm:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
      {children}
    </div>
  );
}
