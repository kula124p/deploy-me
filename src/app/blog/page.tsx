import type { Metadata } from "next";
import Link from "next/link";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type BlogPageProps = {
  searchParams: { page: string };
};

export const metadata: Metadata = {
  title: "Blog",
};

export const BASE_API_URL = "https://jsonplaceholder.typicode.com";
const PAGE_SIZE = 8;

async function getPosts(): Promise<Post[]> {
  const data = await fetch(`${BASE_API_URL}/posts`);
  return data.json();
}

// Get the total number of posts; please note this feature is API specific.
async function getPostsCount(): Promise<number> {
  // https://jsonplaceholder.typicode.com/posts/?_start=5&_limit=8
  const data = await fetch(`${BASE_API_URL}/posts/?_limit=1`, {
    method: "HEAD",
  });
  let count: string | number = data.headers.get("x-total-count") || "1";
  count = parseInt(count, 10);
  return count;
}

function processPost(post: Post) {
  const { id, title } = post;
  return (
    <li key={id} className="mb-4">
      <Link
        href={`/blog/${id}`}
        className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 transition-colors duration-200"
      >
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          Post {id}: {title}
        </h2>
        <p className="font-normal text-gray-700">
          Click to read more about this fascinating topic...
        </p>
      </Link>
    </li>
  );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const postsCount = await getPostsCount();
  const pagesCount = Math.ceil(postsCount / PAGE_SIZE);
  // Ensure the page number is a positive integer.
  const currentPage = Math.min(
    /^[1-9][0-9]*$/.test(searchParams.page) ? Number(searchParams.page) : 1,
    pagesCount
  );
  const _start = (currentPage - 1) * PAGE_SIZE;
  const _limit = PAGE_SIZE;

  console.log({ searchParams });
  console.log({ pagesCount, currentPage, _start, _limit });

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;

  const posts = await getPosts();
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-6xl font-extrabold tracking-tight mb-10">Blog</h1>
      <div className="w-full max-w-2xl mb-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex justify-between items-center">
          <Link
            href={`/blog?page=${currentPage - 1}`}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              isFirstPage
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            aria-disabled={isFirstPage}
          >
            Previous
          </Link>
          <p className="text-gray-700">
            Page{" "}
            <span className="font-semibold text-gray-900">{currentPage}</span>{" "}
            of <span className="font-semibold text-gray-900">{pagesCount}</span>
          </p>
          <Link
            href={`/blog?page=${currentPage + 1}`}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              isLastPage
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            aria-disabled={isLastPage}
          >
            Next
          </Link>
        </div>
      </div>
      <ul className="w-full max-w-2xl space-y-4">{posts.map(processPost)}</ul>
    </main>
  );
}
