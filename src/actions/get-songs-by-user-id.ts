import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Song } from '@/types/data'

const getSongsByUserId = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  })

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError) {
    console.log(sessionError.message)
    return []
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', session?.user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error.message)
    return []
  }

  return (data as any) || []
}

export default getSongsByUserId
