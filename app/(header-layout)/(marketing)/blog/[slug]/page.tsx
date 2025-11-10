import Image from "next/image";
import Link from "next/link";
import { getBlogBySlug, getBlogBySite } from "../BlogService";
// import DOMPurify from "isomorphic-dompurify";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const slug =
    blog.slug ||
    blog.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  const baseUrl = "https://oktaxis.co.uk/"; // Replace with your production domain
  const canonicalUrl = `${baseUrl}/blog/${slug}`;

  return {
    title: `${blog.title}`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [
        {
          url: blog.image || "/default.jpg",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: "article",
      publishedTime: blog.date,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.image || "/default.jpg"],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
type Category = {
  id: number;
  name: string;
  parent: number;
};
type BlogPost = {
  _id: string;
  slug?: string;
  title: string;
  content?: string;
  featuredImage?: string;
  publishDate?: string;
  createdAt: string;
  updatedAt?: string;
  description?: string;
  author?: string;
  categories?: Category[];
};

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlogBySlug(params.slug);
  const allPosts: BlogPost[] = await getBlogBySite("OK Taxis");

  const relatedArticles = allPosts
    .filter((item) => item.slug !== blog.slug)
    .slice(0, 3);

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Blog post not found
      </div>
    );
  const dateString = blog.date || blog.createdAt;
  const dateObj = dateString ? new Date(dateString) : null;
  const isValidDate = dateObj && !isNaN(dateObj.getTime());
  return (
    <>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: blog.description,
            image: blog.featuredImage || "/default.jpg",
            author: {
              "@type": "Person",
              name: blog.author || "OK Taxis",
            },
            publisher: {
              "@type": "Organization",
              name: "OK Taxis",
              logo: {
                "@type": "ImageObject",
                url: "https://oktaxis.co.uk/logo.png", // Replace with real logo
              },
            },
            datePublished: blog.publishDate || blog.createdAt,
            dateModified: blog.updatedAt || blog.publishDate || blog.createdAt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://oktaxis.co.uk/blog/${slugify(
                blog.slug || blog.title
              )}`,
            },
          }),
        }}
      /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32">
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-brand"
              >
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <Link
                  href="/blog"
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-brand md:ml-2"
                >
                  Blog
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  {blog.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="lg:w-2/3">
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                {Array.isArray(blog.categories) &&
                  blog.categories.length > 0 ? (
                  blog.categories.map((cat: Category, idx: number) => (
                    <span
                      key={idx}
                      className="inline-block px-3 py-1 bg-black text-brand  rounded-full text-xs font-semibold tracking-wide uppercase mr-2"
                    >
                      {cat.name}
                    </span>
                  ))
                ) : (
                  <span className="inline-block px-3 py-1  bg-black text-brand rounded-full text-xs font-semibold tracking-wide uppercase">
                    General
                  </span>
                )}

                <time
                  dateTime={new Date(
                    blog.publishDate ?? blog.createdAt
                  ).toISOString()}
                  className="text-sm text-gray-500"
                >
                  {new Date(
                    blog.publishDate ?? blog.createdAt
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900  leading-tight mb-2">
                {blog.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">{blog.description}</p>
            </header>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg mb-8">
              <Image
                src={blog.featuredImage || "/default.jpg"}
                alt={blog.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              />
            </div>

            {/* <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-ul:list-disc prose-ol:list-decimal mt-10 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content),
              }}
            /> */}
          </main>

          <aside className="lg:w-1/3 lg:pl-8">
            <div className="sticky top-8">
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b">
                  Related Articles
                </h3>
                <div className="space-y-6">
                  {relatedArticles.map((post) => (
                    <article key={post._id} className="group">
                      <Link
                        href={`/blog/${slugify(post.slug || post.title)}`}
                        className="block"
                      >
                        <div className="aspect-video relative rounded-lg overflow-hidden mb-3">
                          <Image
                            src={post.featuredImage || "/default.jpg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        {Array.isArray(post.categories) &&
                          post.categories.length > 0 ? (
                          post.categories.map((cat: Category, idx: number) => (
                            <span
                              key={idx}
                              className="inline-block px-3 py-1 bg-black mb-4 text-brand rounded-full text-xs font-semibold tracking-wide uppercase mr-2"
                            >
                              {cat.name}
                            </span>
                          ))
                        ) : (
                          <span className="inline-block px-3 py-1 text-brand bg-black rounded-full text-xs font-semibold tracking-wide uppercase">
                            General
                          </span>
                        )}

                        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {(post.content ?? "").replace(/<[^>]*>?/gm, "")}
                        </p>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
