import { Separator } from "@/app/(client)/_components/ui/separator";
import { SidebarNav } from "@/app/(client)/_components/admin/sidebar-nav";

const sidebarNavItems = [
  {
    title: "Category",
    href: "/admin/category",
  },
  {
    title: "Products",
    href: "/admin/product",
  },
  {
    title: "Banners",
    href: "/admin/banner",
  },
  {
    title: "Deals",
    href: "/admin/deal",
  },
  {
    title: "Orders",
    href: "/admin/orders",
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Admin Panel</h2>
        <p className="text-muted-foreground">
          Manage your store settings and preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
