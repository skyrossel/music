import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Song } from '@/types/data'

export const useImage = (song: Song) => {
  const supabaseClient = useSupabaseClient()

  if (!song) {
    return ''
  }

  const { data } = supabaseClient.storage
    .from('images')
    .getPublicUrl(song.image_path)

  return data.publicUrl
}
