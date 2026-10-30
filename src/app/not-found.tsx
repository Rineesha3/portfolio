import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-7xl font-bold text-accent">Oops!</h1>
      <p className="mt-2 text-lg text-muted">
        We couldn&rsquo;t find the page you were looking for
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-accent px-12 py-2.5 text-sm font-semibold transition-colors hover:bg-accent-hover"
      >
        Go Back
      </Link>
    </main>
  );
}
