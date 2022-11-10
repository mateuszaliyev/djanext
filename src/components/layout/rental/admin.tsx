import { useRouter } from "next/router";

import { LayoutSidebar, type LayoutSidebarProps } from "../sidebar";

export type LayoutAdminProps = Omit<LayoutSidebarProps, "links">;

export const LayoutAdmin = ({ children, ...props }: LayoutAdminProps) => {
  const { asPath } = useRouter();

  return (
    <LayoutSidebar
      links={[
        {
          active: asPath.startsWith("/admin/categories"),
          href: "/admin/categories",
          text: "Kategorie",
        },
        {
          active: asPath.startsWith("/admin/products"),
          href: "/admin/products",
          text: "Produkty",
        },
        {
          active: asPath.startsWith("/admin/users"),
          href: "/admin/users",
          text: "Użytkownicy",
        },
      ]}
      {...props}
    >
      {children}
    </LayoutSidebar>
  );
};
