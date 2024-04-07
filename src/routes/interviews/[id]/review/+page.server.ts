import { supabase } from "$lib/supabaseClient";
import { error as errorBall } from '@sveltejs/kit';

export async function load({ params }) {
  const interviewId = params.id;
  let data, error, result

  // result = await supabase.from("auth.users").select()
  // data = result.data;
  // error = result.error;
  // if (error) throw errorBall(500, error.message);
  // console.log({ users: data });

  result = await supabase.from("interviews").select(
    `
      id,
      name,
      description,
      created_at,
      interviewer (
        name,
        description
      )
    `
  )
    .eq('id', interviewId)
    .single();
  // questions (
  //   id,
  //   content
  // ),
  // answers (
  //   id,
  //   content
  // )

  data = result.data;
  error = result.error;
  if (error) throw errorBall(500, error.message);

  console.log({ data });
  console.log('questions: ', data.questions)
  console.log('answers: ', data.answers)
  return {
    data: data ?? {}
  };
}
