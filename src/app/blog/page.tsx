import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
};

// This is typically fetched from an API
const posts = [12, 3, 56, 7, 89];

function processPost(id: number) {
  return (
    <li key={id} className="mb-4">
      <Link
        href={`/blog/${id}`}
        className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 transition-colors duration-200"
      >
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          Post {id}
        </h2>
        <p className="font-normal text-gray-700">
          Click to read more about this fascinating topic...
        </p>
      </Link>
    </li>
  );
}

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-6xl font-extrabold tracking-tight mb-10">Blog</h1>
      <ul className="w-full max-w-2xl space-y-4">{posts.map(processPost)}</ul>
    </main>
  );
}
