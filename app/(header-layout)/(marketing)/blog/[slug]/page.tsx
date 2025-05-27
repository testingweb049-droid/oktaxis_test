import { blogData } from "@/constants/headerFooterData";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

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

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = blogData.find((item: BlogPost) => slugify(item.title) === params.slug);
  
  if (!blog) return <div className="min-h-screen flex items-center justify-center">Blog post not found</div>;

  return (
    <>
      <Head>
        <title>{blog.title} | OK Taxis Manchester</title>
        <meta name="description" content={blog.description} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:image" content={blog.image} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <Link href="/blog" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">Blog</Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{blog.title}</span>
              </div>
            </li>
          </ol>
        </nav>

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

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold tracking-wide uppercase">
              {blog.category}
            </span>
            <time dateTime={new Date(blog.date).toISOString()} className="text-sm text-gray-500">
              {blog.date}
            </time>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {blog.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">{blog.description}</p>
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <span className="sr-only">OK Taxis</span>
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                OK
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">OK Taxis</p>
              <p className="text-sm text-gray-500">Manchester Transport Specialists</p>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-ul:list-disc prose-ol:list-decimal">
          {blog.content.map((section, index) => (
            <section key={index} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
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
                          <h3 className="text-2xl font-semibold text-gray-800">
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
        <aside className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white shadow-lg">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready for a premium travel experience?</h2>
            <p className="text-blue-100 mb-6 text-lg">
              Book your Manchester airport transfer or chauffeur service today with OK Taxis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/booking" 
                className="px-6 py-3 bg-white text-blue-800 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
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

        {/* Related Articles */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">More Helpful Guides</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {blogData
              .filter(item => item.id !== blog.id)
              .slice(0, 2)
              .map(post => (
                <article key={post.id} className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <Link href={`/blog/${slugify(post.title)}`} className="block">
                    <div className="aspect-video relative">
                      <Image 
                        src={post.image} 
                        alt={post.title}
                        fill
                        className="object-cover"

                        
                      />
                    </div>
                    <div className="p-6">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-2">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-3">{post.description}</p>
                      <span className="text-sm text-blue-600 font-medium">Read more →</span>
                    </div>
                  </Link>
                </article>
              ))}
          </div>
        </section>
      </article>
    </>
  );
}