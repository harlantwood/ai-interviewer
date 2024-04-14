// import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js'
import {
  PUBLIC_SUPABASE_LOCAL,
  PUBLIC_SUPABASE_PROJECT_ID,
  PUBLIC_SUPABASE_PUBKEY_LOCAL,
  PUBLIC_SUPABASE_PUBKEY_SAAS,
} from '$env/static/public'
// import { createSeeds} from './supabaseSeeds.js'

const local = PUBLIC_SUPABASE_LOCAL === 'true'

const projectId = PUBLIC_SUPABASE_PROJECT_ID
const anonPublicKey = local ? PUBLIC_SUPABASE_PUBKEY_LOCAL : PUBLIC_SUPABASE_PUBKEY_SAAS
const supabaseUrl = local
  ? `http://localhost:54321` // default docker port from `supabase start && supabase status`
  : `https://${projectId}.supabase.co`
// console.log({ supabaseUrl })
export const supabase = createClient(supabaseUrl, anonPublicKey)
