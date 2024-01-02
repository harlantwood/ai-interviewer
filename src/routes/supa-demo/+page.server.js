import { supabase } from "$lib/supabaseClient";

export async function load() {
  const { data } = await supabase.from("my_table").select();
  console.log({data});
  return {
    nodes: data ?? [],
  };
}
