"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
      <p className="font-lato text-2xl font-black">
        <span className="text-brand-primary">design</span>
        <span className="text-brand-text-strong">matters</span>
        <span className="text-brand-primary">.</span>
      </p>
      <ul className="flex justify-center space-x-4">
        {pages.map((page, index) => processPage(page, index, pathname))}
      </ul>
    </nav>
  );
}
