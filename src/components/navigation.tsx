"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import { cn } from "@/lib/utils";

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
  const isActive =
    page.path === "/" ? pathname === page.path : pathname.startsWith(page.path);
  return (
    <li key={index}>
      <Link href={page.path}>
        <span
          className={cn(
            "border rounded-sm border-transparent px-4 py-2 whitespace-nowrap",
            { "hover:text-white hover:bg-brand-primary": !isActive },
            {
              "text-brand-primary border rounded-sm border-brand-primary":
                isActive,
            }
          )}
        >
          {page.title}
        </span>
      </Link>
    </li>
  );
}

function Hamburger() {
  return (
    <button
      className="flex md:hidden flex-col justify-center items-end w-11 h-11 p-2 space-y-1.5 rounded-sm hover:bg-brand-stroke-weak active:bg-brand-stroke-weak"
      aria-label="Open menu"
    >
      <span className="w-7 h-1 bg-brand-black rounded-full" />
      <span className="w-4 h-1 bg-brand-black rounded-full" />
      <span className="w-6 h-1 bg-brand-black rounded-full" />
    </button>
  );
}

export function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="py-8 border-b border-brand-stroke-weak sticky top-0 z-10 bg-brand-fill">
      <div className="container flex justify-between items-center">
        <Link href="/">
          <Logo className="text-2xl" />
        </Link>

        {/* Hidden on mobile */}
        <ul className="hidden md:flex justify-between space-x-4 text-sm uppercase text-brand-text-strong">
          {pages.map((page, index) => processPage(page, index, pathname))}
        </ul>

        {/* Visible on mobile */}
        <Hamburger />
        <ul
          className={
            "flex md:hidden flex-col absolute top-full left-0 items-center w-full bg-brand-fill py-6 space-y-6 text-sm uppercase text-brand-text-strong border-b border-brand-stroke-weak"
          }
        >
          {pages.map((page, index) => processPage(page, index, pathname))}
        </ul>
      </div>
    </nav>
  );
}
