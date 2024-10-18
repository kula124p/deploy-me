import Link from "next/link";

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

function processPage(page: Page, index: number) {
  return (
    <li key={index}>
      <a href={page.path}>{page.title}</a>
    </li>
  );
}

function processPage_Link(page: Page, index: number) {
  return (
    <li key={index}>
      <Link href={page.path}>{page.title}</Link>
    </li>
  );
}

export function Navigation() {
  return <ul className="flex space-x-4 mb-4">{pages.map(processPage)}</ul>;
}

function Navigation_Link() {
  return <ul className="flex space-x-4 mb-4">{pages.map(processPage_Link)}</ul>;
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <Navigation />
      <Navigation_Link />
      <h1 className="text-6xl font-extrabold tracking-tight">Home page</h1>
    </main>
  );
}
