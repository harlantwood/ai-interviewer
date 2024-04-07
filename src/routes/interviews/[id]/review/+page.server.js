import { supabase } from "$lib/supabaseClient";

export async function load({ params }) {
  const {id} = params;
  const { data } = await supabase.from("interviews").select()
    .eq('id', id)
    // .single();
  console.log({data});
  return {
    nodes: data ?? [],
  };
}
