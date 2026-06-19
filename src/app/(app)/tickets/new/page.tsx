import { TicketForm } from "@/components/TicketForm";
import { createTicket } from "@/lib/actions/tickets";

export default function NewTicketPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg font-medium text-neutral-900">New ticket</h1>
      <TicketForm action={createTicket} submitLabel="Create ticket" />
    </div>
  );
}
