import { supabase } from '$lib/supabaseClient'
import { error as errorBall } from '@sveltejs/kit'

export async function load() {
  const result = await supabase.from('interviews').select()

  const interviews = result.data as Interview[]
  const error = result.error
  if (error) throw errorBall(500, error.message)

  const data = { interviews }
  return data
}
