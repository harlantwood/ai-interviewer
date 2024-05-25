import { error as errorBall } from '@sveltejs/kit'

export async function load({ params, locals: { supabase } }) {
  const interviewId = params.id

  const result = await supabase
    .from('interviews')
    .select(
      `
      id,
      name,
      description,
      interviewer (
        name,
        description
      ),
      script_questions (
        id,
        content,
        interview_questions (
          id,
          content
        )
      )

    `
    )
    .eq('id', interviewId)
    .single()

  const interview = result.data
  const error = result.error
  if (error) throw errorBall(500, error.message)

  const data = { interview }
  return data
}
