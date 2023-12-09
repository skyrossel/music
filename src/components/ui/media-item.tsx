import Image from 'next/image'
import { usePlayer } from '@/hooks/use-player'
import { useImage } from '@/hooks/use-image'
import { Song } from '@/types/data'

interface MediaItemProps {
  onClick?: (id: string) => void
  song: Song
}

const MediaItem: React.FC<MediaItemProps> = ({ onClick, song }) => {
  const player = usePlayer()
  const imageUrl = useImage(song)

  const handleClick = () => {
    if (onClick) {
      return onClick(song.id)
    }

    return player.setId(song.id)
  }

  return (
    <div
      onClick={handleClick}
      className="group flex cursor-pointer items-center justify-between rounded-lg"
    >
      <div className="flex items-center gap-x-2">
        <div className="relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt={song.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h5 className="text-sm font-medium leading-none">{song.title}</h5>
          <p className="text-xs text-muted-foreground">By {song.author}</p>
        </div>
      </div>
    </div>
  )
}

export default MediaItem
