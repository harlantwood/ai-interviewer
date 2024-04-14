import { supabase } from '$lib/supabaseClient'
import { error as errorBall } from '@sveltejs/kit'

export async function load({ params }) {
  const interviewId = params.id
  let result, error

  // result = await supabase.from("auth.users").select()
  // data = result.data;
  // error = result.error;
  // if (error) throw errorBall(500, error.message);
  // console.log({ users: data });

  result = await supabase
    .from('interviews')
    .select(
      `
      id,
      name,
      description,
      created_at,
      interviewer (
        name,
        description
      ),
      script_questions (
        id,
        content,
        interview_questions (
          id,
          content,
          answers (
            id,
            transcript,
            summary
          )
        )
      )

    `
    )
    .eq('id', interviewId)
    .single()

  const interview = result.data
  error = result.error
  if (error) throw errorBall(500, error.message)

  const data = {
    interview,
  }
  return {
    data: data ?? {},
  }
}
