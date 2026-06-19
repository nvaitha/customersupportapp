import type { TicketStatus } from "@/lib/supabase/types";

const styles: Record<TicketStatus, string> = {
  active: "bg-amber-100 text-amber-800",
  resolved: "bg-neutral-100 text-neutral-600",
};

export function StatusBadge({ status }: { status: TicketStatus }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[status]}`}>
      {status === "active" ? "Active" : "Resolved"}
    </span>
  );
}
