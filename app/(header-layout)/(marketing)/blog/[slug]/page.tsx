// app/blog/[slug]/page.tsx

import { blogData } from "@/constants/headerFooterData";

const slugify = (text: string) =>
  text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = blogData.find((item) => slugify(item.title) === params.slug);

//   if (!blog) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <img
        src={blog?.image}
        alt={blog?.title}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
      <p className="text-sm text-gray-500 mb-2">
        {blog?.date} • {blog?.category}
      </p>
      <p className="text-lg text-gray-700">{blog?.description}</p>
    </div>
  );
}
