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

  let interview = result.data;
  error = result.error;
  if (error) throw errorBall(500, error.message);

  console.log({ data });


  result = await supabase
    .from("question_answer_joins")
    .select(
      `
        question_id,
        answer_id,
        position
      `
    )
    .eq('interview_id', interviewId)
  // questions (
  //   id,
  //   content
  // ),
  // answers (
  //   id,
  //   content
  // )

  const qa = result.data;
  error = result.error;
  if (error) throw errorBall(500, error.message);

  console.log({ qa_joins: data });


  return {
    data: interview ?? {}
  };
}
