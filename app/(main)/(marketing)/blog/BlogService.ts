import { headers } from 'next/headers';

export async function getBlogBySite(siteName: string) {
  const encoded = encodeURIComponent(siteName);
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const res = await fetch(`${protocol}://${host}/api/blogs/site/${encoded}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch blog posts");
  return res.json();
}

export async function getBlogBySlug(slugName: string) {
  const encoded = encodeURIComponent(slugName);
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const res = await fetch(`${protocol}://${host}/api/blogs/slug/${encoded}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch blog posts");
  return res.json();
}