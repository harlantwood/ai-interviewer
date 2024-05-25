declare global {
  type FormAccountUpdateResult = {
    errorMessage?: string
    errorFields?: string[]
    fullName?: string
    companyName?: string
    website?: string
    email?: string
  }

  type Interview = {
    id: string
    name: string
  }

  type Profile = {
    avatar_url: string | null
    full_name: string | null
    id: string
    updated_at: string | null
    company_name: string | null
    website: string | null
  }
}

export {}
