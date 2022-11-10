import type { ReactNode } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { Navbar } from "@/components/navbar";

export type LayoutMainProps = {
  children?: ReactNode;
  title?: string;
  withoutMain?: boolean;
};

export const LayoutMain = ({
  children,
  title = "acme",
  withoutMain = false,
}: LayoutMainProps) => {
  const { asPath } = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar
        links={[
          {
            active: asPath === "/",
            href: "/",
            text: "Strona główna",
          },
          {
            active: asPath.startsWith("/rental"),
            href: "/rental",
            text: "Wypożyczalnia",
          },
          {
            active: asPath.startsWith("/contact"),
            href: "/contact",
            text: "Kontakt",
          },
        ]}
        menu={{
          items: [
            {
              href: "/profile",
              text: "Twój profil",
            },
            {
              href: "/settings",
              text: "Ustawienia",
            },
            {
              href: "/sign-out",
              text: "Wyloguj się",
            },
          ],
          label: "Otwórz menu użytkownika",
          text: "Profil",
        }}
      />
      {withoutMain ? (
        children
      ) : (
        <main className="mt-16 flex flex-grow flex-col">{children}</main>
      )}
    </>
  );
};
