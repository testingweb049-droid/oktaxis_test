import BlogCard from "@/components/ui/BlogCard";
import BlogHeroSection from "@/components/ui/BlogHeroSection";
import Link from "next/link";
import { headers } from "next/headers";
import Seo from "../../../../components/Seo";
// Correct API route: /api/posts/site/[siteName]
async function getBlogsBySite(siteName: string) {
  const encoded = encodeURIComponent(siteName);
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const url = `${protocol}://${host}/api/blogs/site/${encoded}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch blog posts");
  return res.json();
}

const slugify = (t: string) =>
  t
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

export default async function Blog() {
  let posts: BlogPost[] = [];

  try {
    posts = await getBlogsBySite("OK Taxis");
  } catch (err) {
    console.error("Blog fetch error:", err);
  }

  return (
    <div className="bg-gray-50">
      <Seo
        title="OKTaxis Blog – Expert Travel Tips & Updates"
        description="Explore the OKTaxis blog for expert travel advice, company news, and local tips from Manchester’s premier taxi and chauffeur service."
        url="https://oktaxis.co.uk/blog"
        image="https://oktaxis.co.uk/stadium%20transfers%20to%20manchester%20united.webp"
      />

      <BlogHeroSection
        bgImage="/stadium transfers to manchester united.webp"
        title="OKTaxis Blog – Insights & Travel Tips"
        description="Discover expert advice, company updates, and travel insights from Manchester's premier chauffeur service."
      />

      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {posts.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-xl font-semibold">
              No blog posts found for this site yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((blog) => {
              const categoryLabel = Array.isArray(blog.categories)
                ? blog.categories.map((c) => c.name).join(", ")
                : blog.categories || "General";

              return (
                <Link
                  key={blog._id}
                  href={`/blog/${slugify(blog.slug || blog.title)}`}
                >
                  <BlogCard
                    title={blog.title}
                    description={(blog.content ?? "").replace(/<[^>]*>?/gm, "")}
                    image={blog.featuredImage}
                    date={new Date(
                      blog.publishDate ?? blog.createdAt
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    author={blog.author || "OK Taxis"}
                    category={categoryLabel}
                  />
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
