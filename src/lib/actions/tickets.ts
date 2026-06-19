"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { TicketStatus } from "@/lib/supabase/types";

function isMissingManagerCommentsColumn(error: { message?: string; code?: string }) {
  return error.code === "PGRST204" || error.message?.includes("manager_comments");
}

export async function createTicket(formData: FormData) {
  const title = (formData.get("title") as string)?.trim() || "Untitled ticket";
  const description = (formData.get("description") as string)?.trim() || "";
  const managerComments = (formData.get("manager_comments") as string)?.trim() || "";
  const orderRef = (formData.get("order_ref") as string)?.trim() || null;

  const supabase = createSupabaseServerClient();
  const ticketPayload = {
    title,
    description,
    manager_comments: managerComments,
    order_ref: orderRef,
  };

  let result = await supabase
    .from("tickets")
    .insert(ticketPayload)
    .select("id")
    .single();

  if (result.error && isMissingManagerCommentsColumn(result.error)) {
    const fallbackPayload = { title, description, order_ref: orderRef };
    result = await supabase.from("tickets").insert(fallbackPayload).select("id").single();
  }

  const { data, error } = result;
  if (error) throw new Error(error.message);

  revalidatePath("/tickets");
  redirect(`/tickets/${data.id}`);
}

export async function updateTicket(id: string, formData: FormData) {
  const title = (formData.get("title") as string)?.trim() || "Untitled ticket";
  const description = (formData.get("description") as string)?.trim() || "";
  const managerComments = (formData.get("manager_comments") as string)?.trim() || "";
  const orderRef = (formData.get("order_ref") as string)?.trim() || null;

  const supabase = createSupabaseServerClient();
  const ticketPayload = {
    title,
    description,
    manager_comments: managerComments,
    order_ref: orderRef,
  };

  let result = await supabase
    .from("tickets")
    .update(ticketPayload)
    .eq("id", id);

  if (result.error && isMissingManagerCommentsColumn(result.error)) {
    const fallbackPayload = { title, description, order_ref: orderRef };
    result = await supabase.from("tickets").update(fallbackPayload).eq("id", id);
  }

  const { error } = result;
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

export async function deleteTicket(id: string, formData?: FormData) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("tickets").delete().eq("id", id);

  if (error) throw new Error(error.message);

  const redirectTo = formData?.get("redirect_to");
  const nextPath =
    typeof redirectTo === "string" && redirectTo.startsWith("/tickets") ? redirectTo : "/tickets";

  revalidatePath("/tickets");
  redirect(nextPath);
}
