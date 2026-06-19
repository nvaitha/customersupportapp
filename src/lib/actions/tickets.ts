"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { TicketStatus } from "@/lib/supabase/types";

export async function createTicket(formData: FormData) {
  const title = (formData.get("title") as string)?.trim() || "Untitled ticket";
  const description = (formData.get("description") as string)?.trim() || "";
  const orderRef = (formData.get("order_ref") as string)?.trim() || null;

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("tickets")
    .insert({ title, description, order_ref: orderRef })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/tickets");
  redirect(`/tickets/${data.id}`);
}

export async function updateTicket(id: string, formData: FormData) {
  const title = (formData.get("title") as string)?.trim() || "Untitled ticket";
  const description = (formData.get("description") as string)?.trim() || "";
  const orderRef = (formData.get("order_ref") as string)?.trim() || null;

  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("tickets")
    .update({ title, description, order_ref: orderRef })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/tickets");
  revalidatePath(`/tickets/${id}`);
  redirect(`/tickets/${id}`);
}

export async function toggleStatus(id: string, currentStatus: TicketStatus) {
  const nextStatus: TicketStatus = currentStatus === "active" ? "resolved" : "active";

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("tickets").update({ status: nextStatus }).eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/tickets");
  revalidatePath(`/tickets/${id}`);
}
