"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";

type Page = {
  title: string;
  path: `/${string}`;
};

// We hardcode pages here, but you could get this information from some external source (e.g. CMS, DB, config file, etc).
const pages: Page[] = [
  { title: "Home", path: "/" },
  {
    title: "Showcase",
    path: "/showcase",
  },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "About us",
    path: "/about",
  },
  {
    title: "Contact us",
    path: "/contact",
  },
];

function processPage(page: Page, index: number, pathname: string) {
  return (
    <li key={index}>
      <Link
        href={page.path}
        className={
          page.path === "/"
            ? pathname === page.path
              ? "font-extrabold"
              : ""
            : pathname.startsWith(page.path)
            ? "font-extrabold"
            : ""
        }
      >
        {page.title}
      </Link>
    </li>
  );
}

export function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="flex justify-center items-baseline space-x-4 mt-8">
      <Logo className="text-2xl" />
      <Logo theme="dark" className="text-2xl" />
      <ul className="flex justify-center space-x-4">
        {pages.map((page, index) => processPage(page, index, pathname))}
      </ul>
    </nav>
  );
}
