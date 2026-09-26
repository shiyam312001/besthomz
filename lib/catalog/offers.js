import { createClientOptional } from "@/lib/supabase/server";
import * as offerService from "@/lib/services/offers";

export async function fetchActiveOffers() {
  const supabase = await createClientOptional();
  if (supabase) {
    const { data, error } = await offerService.getActiveOffers(supabase);
    if (!error && data?.length) return data;
  }
  return [];
}
