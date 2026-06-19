export type TicketStatus = "active" | "resolved";

export type Ticket = {
  id: string;
  title: string;
  description: string;
  manager_comments: string;
  order_ref: string | null;
  status: TicketStatus;
  created_at: string;
  updated_at: string;
};
