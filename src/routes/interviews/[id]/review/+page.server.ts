import { supabase } from "$lib/supabaseClient";
import { error as errorBall } from '@sveltejs/kit';

export async function load({ params }) {
  const interviewId = params.id;
  let result, error

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

  // console.log({ interview });


  result = await supabase
    .from("question_answer_joins")
    .select(
      `
        question_id (
          id,
          content
        ),
        answer_id (
          content
        ),
        interview_id,
        position
      `
    )
    .eq('interview_id', interviewId)
    .order('position', { ascending: true })

  error = result.error;
  if (error) throw errorBall(500, error.message);

  let qa = result.data;
  console.log(JSON.stringify({ qa }, null, 2));

  // Group by question_id
  qa = qa.reduce((acc, item) => {
    const key = item.question_id.id;
    console.log({ key });
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  error = result.error;
  if (error) throw errorBall(500, error.message);

  console.log(JSON.stringify({ qa }, null, 2));


  const data = {
    interview,
    qa
  }
  return {
    data: data ?? {}
  };
}
