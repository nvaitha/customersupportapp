import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { TicketForm } from "@/components/TicketForm";
import { StatusBadge } from "@/components/StatusBadge";
import { SubmitButton } from "@/components/SubmitButton";
import { deleteTicket, updateTicket, toggleStatus } from "@/lib/actions/tickets";
import type { Ticket } from "@/lib/supabase/types";

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createSupabaseServerClient();

  const { data: ticket, error } = await supabase
    .from("tickets")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!ticket) notFound();

  const typedTicket = ticket as Ticket;
  const toggleStatusForTicket = toggleStatus.bind(null, typedTicket.id, typedTicket.status);
  const updateTicketForId = updateTicket.bind(null, typedTicket.id);
  const deleteTicketForId = deleteTicket.bind(null, typedTicket.id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium text-neutral-900">{typedTicket.title}</h1>
        <div className="flex items-center gap-3">
          <StatusBadge status={typedTicket.status} />
          <form action={toggleStatusForTicket}>
            <SubmitButton
              pendingLabel="Updating..."
              className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Mark as {typedTicket.status === "active" ? "resolved" : "active"}
            </SubmitButton>
          </form>
          <form action={deleteTicketForId}>
            <SubmitButton
              pendingLabel="Deleting..."
              className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Delete
            </SubmitButton>
          </form>
        </div>
      </div>

      <TicketForm action={updateTicketForId} initialTicket={typedTicket} submitLabel="Save changes" />
    </div>
  );
}
