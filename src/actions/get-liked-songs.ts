import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Song } from '@/types/data'

const getLikedSongs = async (): Promise<Song[]> => {
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
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', session?.user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error.message)
    return []
  }

  return (
    data.map((item) => ({
      ...item.songs,
    })) || []
  )
}

export default getLikedSongs
