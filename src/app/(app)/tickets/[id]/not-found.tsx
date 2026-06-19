import Link from "next/link";

export default function TicketNotFound() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <p className="text-sm text-neutral-500">Ticket not found.</p>
      <Link href="/tickets" className="text-sm font-medium text-neutral-900 underline">
        Back to tickets
      </Link>
    </div>
  );
}
