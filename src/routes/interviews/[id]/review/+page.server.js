import { supabase } from "$lib/supabaseClient";

export async function load({ params }) {
  const {id} = params;
  const { data } = await supabase.from("interviews").select(
    `
      id,
      name,
      description,
      created_at,
      interviewer (
        name,
        description
      ),
      questions (
        id,
        content
      ),
      answers (
        id,
        content
      )
    `
  )
    .eq('id', id)
    .single();



  console.log({data});
  console.log('questions: ', data.questions)
  console.log('answers: ', data.answers)
  return {
    data: data ?? {}
  };
}
