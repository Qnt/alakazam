import Drawer from "../_components/drawer";

export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Drawer>{children} </Drawer>;
}
