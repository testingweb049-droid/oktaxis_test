"use client";

interface AdminErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AdminError({ error, reset }: AdminErrorProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
      <h1 className="text-2xl font-semibold text-heading-black">
        Something went wrong
      </h1>
      <p className="max-w-md text-base text-text-gray">
        We couldn&apos;t load the admin page. You can try again, or go back to
        the dashboard.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-md border border-border bg-white px-4 py-2 text-base font-medium text-heading-black hover:bg-light-background"
        >
          Try again
        </button>
        <a
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-md bg-heading-black px-4 py-2 text-base font-semibold text-white hover:bg-black"
        >
          Go to dashboard
        </a>
      </div>
      {process.env.NODE_ENV === "development" && (
        <p className="mt-4 text-xs text-text-gray">
          {error.message} {error.digest && `(${error.digest})`}
        </p>
      )}
    </div>
  );
}


