import { redirect } from '@sveltejs/kit'
// import { supabase } from '$lib/supabaseClient'
import { error as errorBall } from '@sveltejs/kit'

export async function load({ locals: { supabase } }) {
  const result = await supabase.from('interviews').select()

  const interviews = result.data as Interview[]
  const error = result.error
  if (error) throw errorBall(500, error.message)

  const data = { interviews }
  return data
}

export const actions = {
  signout: async ({ locals: { supabase, safeGetSession } }) => {
    const { session } = await safeGetSession()
    if (session) {
      await supabase.auth.signOut()
      redirect(303, '/')
    }
  },
}
