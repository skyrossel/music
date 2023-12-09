'use client'

import { useEffect, useState } from 'react'
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react'
//@ts-ignore
import useSound from 'use-sound'
import { usePlayer } from '@/hooks/use-player'
import { Song } from '@/types/data'
import MediaItem from '@/components/ui/media-item'
import LikeButton from '@/components/ui/like-button'
import { Button } from '@/components/ui/button'
import { VolumeSlider } from '@/components/ui/volume-slider'

interface PlayerContentProps {
  song: Song
  songUrl: string
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)

  const player = usePlayer()

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const previousSong = player.ids[currentIndex - 1]

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1])
    }

    player.setId(previousSong)
  }

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const nextSong = player.ids[currentIndex + 1]

    if (!nextSong) {
      return player.setId(player.ids[0])
    }

    player.setId(nextSong)
  }

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false)
      onPlayNext()
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3'],
  })

  const handlePlay = () => {
    if (!isPlaying) {
      play()
    } else {
      pause()
    }
  }

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1)
    } else {
      setVolume(0)
    }
  }

  useEffect(() => {
    sound?.play()

    return () => {
      sound?.unload()
    }
  }, [sound])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3">
      <div className="flex items-center gap-x-4">
        <MediaItem song={song} />
        <div className="hidden md:block">
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="col-auto flex items-center justify-end md:hidden">
        <Button
          onClick={handlePlay}
          variant="white"
          size="icon"
          className="rounded-full"
        >
          {isPlaying ? (
            <Pause fill="black" className="h-4 w-4" />
          ) : (
            <Play fill="black" className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="hidden items-center justify-center gap-x-2 md:flex">
        <Button
          onClick={onPlayPrevious}
          variant="link"
          size="icon"
          className="text-zinc-400 hover:text-foreground"
        >
          <SkipBack className="fill-zinc-400 hover:fill-foreground" />
        </Button>
        <Button
          onClick={handlePlay}
          variant="white"
          size="icon"
          className="rounded-full"
        >
          {isPlaying ? (
            <Pause fill="black" className="h-4 w-4" />
          ) : (
            <Play fill="black" className="h-4 w-4" />
          )}
        </Button>
        <Button
          onClick={onPlayNext}
          variant="link"
          size="icon"
          className="text-zinc-400 hover:text-foreground"
        >
          <SkipForward className="fill-zinc-400 hover:fill-foreground" />
        </Button>
      </div>
      <div className="hidden justify-end md:flex">
        <div className="flex w-[7.5rem] items-center gap-x-4 pr-2">
          {volume === 0 ? (
            <VolumeX onClick={toggleMute} className="h-5 w-5 cursor-pointer" />
          ) : (
            <Volume2 onClick={toggleMute} className="h-5 w-5 cursor-pointer" />
          )}
          <VolumeSlider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  )
}

export default PlayerContent
