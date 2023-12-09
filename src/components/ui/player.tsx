'use client'

import { usePlayer } from '@/hooks/use-player'
import { useSong } from '@/hooks/use-song'
import { useSongById } from '@/hooks/use-song-by-id'
import PlayerContent from '@/components/ui/player-content'

const Player = () => {
  const player = usePlayer()
  const { song } = useSongById(player.activeId)

  const songUrl = useSong(song!)

  if (!player.activeId || !song || !songUrl) {
    return null
  }

  return (
    <div
      data-state={player.activeId ? 'open' : 'close'}
      className="fixed bottom-0 z-50 h-[4.5rem] w-full bg-background px-4 py-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    >
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  )
}

export default Player
