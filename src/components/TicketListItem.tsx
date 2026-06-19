import Link from "next/link";
import { deleteTicket } from "@/lib/actions/tickets";
import type { Ticket } from "@/lib/supabase/types";
import { StatusBadge } from "@/components/StatusBadge";
import { SubmitButton } from "@/components/SubmitButton";

export function TicketListItem({ ticket, currentStatus }: { ticket: Ticket; currentStatus?: string }) {
  const deleteTicketForId = deleteTicket.bind(null, ticket.id);
  const redirectTo =
    currentStatus === "active" || currentStatus === "resolved"
      ? `/tickets?status=${currentStatus}`
      : "/tickets";

  return (
    <li className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-neutral-50">
      <Link href={`/tickets/${ticket.id}`} className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-neutral-900">{ticket.title}</span>
        {ticket.order_ref && (
          <span className="mt-1 block truncate text-xs text-neutral-500">Order {ticket.order_ref}</span>
        )}
      </Link>

      <div className="flex shrink-0 items-center gap-3">
        <StatusBadge status={ticket.status} />
        <form action={deleteTicketForId}>
          <input type="hidden" name="redirect_to" value={redirectTo} />
          <SubmitButton
            pendingLabel="Deleting..."
            className="rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Delete
          </SubmitButton>
        </form>
      </div>
    </li>
  );
}
