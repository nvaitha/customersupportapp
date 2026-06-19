import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <Link href="/tickets" className="text-sm font-semibold text-neutral-900">
            Support Tickets
          </Link>
          <form action="/api/logout" method="post">
            <button type="submit" className="text-sm text-neutral-500 hover:text-neutral-700">
              Log out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-8">{children}</main>
    </div>
  );
}
