import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/StatusBadge";
import { StatusFilterTabs } from "@/components/StatusFilterTabs";
import type { Ticket, TicketStatus } from "@/lib/supabase/types";

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const supabase = createSupabaseServerClient();

  let query = supabase.from("tickets").select("*").order("created_at", { ascending: false });
  if (status === "active" || status === "resolved") {
    query = query.eq("status", status satisfies TicketStatus);
  }

  const { data: tickets, error } = await query;
  if (error) throw new Error(error.message);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <StatusFilterTabs current={status} />
        <Link
          href="/tickets/new"
          className="rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white"
        >
          New ticket
        </Link>
      </div>

      {tickets.length === 0 ? (
        <p className="py-12 text-center text-sm text-neutral-500">No tickets here yet.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-neutral-200 rounded-lg border border-neutral-200">
          {(tickets as Ticket[]).map((ticket) => (
            <li key={ticket.id}>
              <Link
                href={`/tickets/${ticket.id}`}
                className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-neutral-50"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-neutral-900">{ticket.title}</span>
                  {ticket.order_ref && (
                    <span className="text-xs text-neutral-500">Order {ticket.order_ref}</span>
                  )}
                </div>
                <StatusBadge status={ticket.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
