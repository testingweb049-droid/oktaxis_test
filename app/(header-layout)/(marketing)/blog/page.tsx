import HeroSection2 from "@/components/ui/hero-section2";
import HeroImg from "@/assets/bmw.png";
import BlogCard from "@/components/ui/BlogCard";
import Link from "next/link";
import { blogData } from "@/constants/headerFooterData";

export default function Blog() {
    const slugify = (text: string) =>
        text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    return (
        <div className="bg-gray-50">
            <HeroSection2
                bgImage={HeroImg.src}
                title="OKTaxis Blog – Insights & Travel Tips"
                description="Discover expert advice, company updates, and travel insights from Manchester's premier chauffeur service."
            />

            <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                <div className="text-center mb-12 lg:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Latest Blog Posts
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                        Stay updated with the latest news, tips, and services from OKTaxis
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogData.map((blog) => (
                        <Link key={blog.id} href={`/blog/${slugify(blog.title)}`}>
                            <BlogCard
                                title={blog.title}
                                description={blog.description}
                                image={blog.image}
                                date={blog.date}
                                author="OKTaxis"
                                category={blog.category}
                            />
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}