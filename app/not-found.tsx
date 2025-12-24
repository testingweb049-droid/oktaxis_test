import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
        Page not found
      </h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        The page you are looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
      >
        Go back home
      </Link>
    </main>
  );
}


