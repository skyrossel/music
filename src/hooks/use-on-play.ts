import { useUser } from '@/hooks/use-user'
import { usePlayer } from '@/hooks/use-player'
import { useSignIn } from '@/hooks/use-sign-in'
import { Song } from '@/types/data'

export const useOnPlay = (songs: Song[]) => {
  const { user } = useUser()
  const player = usePlayer()
  const signIn = useSignIn()

  const onPlay = (id: string) => {
    if (!user) {
      alert('First of all you need to login or register to play the song')
      return signIn.onOpen()
    }

    player.setIds(songs.map((song) => song.id))
    player.setId(id)
  }

  return onPlay
}
