import FleetClasses from "@/components/home/fleet";
import { blogData } from "@/constants/headerFooterData";
import Image from "next/image";
import Link from "next/link";

interface QnAItem {
  question: string;
  answer: string;
}

interface BlogContentItem {
  sectionTitle: string;
  sectionContent: (
    string |
    { list: string[] } |
    { subsection: string; text?: string; list?: string[] } |
    { qna: QnAItem[] }
  )[];
}

interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  content: BlogContentItem[];
}

const slugify = (text: string) =>
  text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = blogData.find((item: BlogPost) => slugify(item.title) === params.slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found | OK Taxis Manchester",
      description: "The requested blog post could not be found."
    };
  }

  return {
    title: `${blog.title} | OK Taxis Manchester`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: 'article',
      publishedTime: blog.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
      images: [blog.image],
    },
  };
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = blogData.find((item: BlogPost) => slugify(item.title) === params.slug);

  if (!blog) return <div className="min-h-screen flex items-center justify-center">Blog post not found</div>;

  const relatedArticles = blogData
    .filter(item => item.id !== blog.id)
    .slice(0, 3);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32">
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-brand">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <Link href="/blog" className="ml-1 text-sm font-medium text-gray-700 hover:text-brand md:ml-2">Blog</Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{blog.title}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="lg:w-2/3">
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block px-3 py-1 bg-black text-brand rounded-full text-xs font-semibold tracking-wide uppercase">
                  {blog.category}
                </span>
                <time dateTime={new Date(blog.date).toISOString()} className="text-sm text-gray-500">
                  {blog.date}
                </time>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {blog.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">{blog.description}</p>
            </header>

            {/* Featured Image */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg mb-8">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-ul:list-disc prose-ol:list-decimal">
              {blog.content.map((section, index) => (
                <section key={index} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
                    {section.sectionTitle}
                  </h2>
                  <div className="space-y-6">
                    {section.sectionContent.map((content, contentIndex) => {
                      if (typeof content === 'string') {
                        return (
                          <p key={contentIndex} className="text-lg leading-relaxed">
                            {content}
                          </p>
                        );
                      } else if (content && typeof content === 'object') {
                        // Handle Q&A format
                        if ('qna' in content) {
                          const qnaContent = content as { qna: QnAItem[] };
                          return (
                            <div key={contentIndex} className="space-y-6">
                              {qnaContent.qna.map((item, qnaIndex) => (
                                <div key={qnaIndex} className="bg-gray-50 p-6 rounded-lg">
                                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Q: {item.question}</h3>
                                  <p className="text-gray-700">A: {item.answer}</p>
                                </div>
                              ))}
                            </div>
                          );
                        }
                        // Handle lists
                        else if ('list' in content && !('subsection' in content)) {
                          const listContent = content as { list: string[] };
                          return (
                            <ul key={contentIndex} className="space-y-3 pl-5">
                              {listContent.list.map((item: string, itemIndex: number) => (
                                <li key={itemIndex} className="relative pl-3 before:absolute before:left-0 before:top-3 before:h-1.5 before:w-1.5 before:rounded-full before:bg-blue-600">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        // Handle subsections
                        else if ('subsection' in content) {
                          const subsectionContent = content as {
                            subsection: string;
                            text?: string;
                            list?: string[]
                          };
                          return (
                            <div key={contentIndex} className="space-y-4">
                              <h3 className="text-xl font-semibold text-gray-800">
                                {subsectionContent.subsection}
                              </h3>
                              {subsectionContent.text && (
                                <p className="text-lg leading-relaxed">{subsectionContent.text}</p>
                              )}
                              {subsectionContent.list && (
                                <ul className="space-y-3 pl-5">
                                  {subsectionContent.list.map((item: string, itemIndex: number) => (
                                    <li key={itemIndex} className="relative pl-3 before:absolute before:left-0 before:top-3 before:h-1.5 before:w-1.5 before:rounded-full before:bg-blue-600">
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          );
                        }
                      }
                      return null;
                    })}
                  </div>
                </section>
              ))}
            </div>

            {/* Call to Action */}
            <aside className="mt-12 bg-brand rounded-xl p-8 text-white shadow-lg">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Ready for a premium travel experience?</h2>
                <p className="text-blue-100 mb-6 text-lg">
                  Book your Manchester airport transfer or chauffeur service today with OK Taxis.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/booking"
                    className="px-6 py-3 bg-white text-brand font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    Book Now
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </aside>
          </main>

          {/* Sidebar with Related Articles */}
          <aside className="lg:w-1/3 lg:pl-8">
            <div className="sticky top-8">
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b">Related Articles</h3>
                <div className="space-y-6">
                  {relatedArticles.map(post => (
                    <article key={post.id} className="group">
                      <Link href={`/blog/${slugify(post.title)}`} className="block">
                        <div className="aspect-video relative rounded-lg overflow-hidden mb-3">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <span className="inline-block px-2 py-1 bg-black text-brand rounded-full text-xs font-semibold mb-2">
                          {post.category}
                        </span>
                        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{post.description}</p>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

      </div>
      <FleetClasses />
    </>
  );
}