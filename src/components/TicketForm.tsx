import type { Ticket } from "@/lib/supabase/types";

type TicketFormProps = {
  action: (formData: FormData) => void;
  initialTicket?: Ticket;
  submitLabel: string;
};

export function TicketForm({ action, initialTicket, submitLabel }: TicketFormProps) {
  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-sm font-medium text-neutral-900">
          Title
        </label>
        <input
          id="title"
          name="title"
          defaultValue={initialTicket?.title}
          placeholder="Short summary of the issue"
          className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-neutral-700"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="order_ref" className="text-sm font-medium text-neutral-900">
          Shopify order
        </label>
        <input
          id="order_ref"
          name="order_ref"
          defaultValue={initialTicket?.order_ref ?? ""}
          placeholder="e.g. #1042"
          className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-neutral-700"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium text-neutral-900">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={initialTicket?.description}
          rows={6}
          placeholder="Describe the issue…"
          className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-neutral-700"
        />
      </div>

      <button
        type="submit"
        className="self-start rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
      >
        {submitLabel}
      </button>
    </form>
  );
}
