import Image from 'next/image'
import { useImage } from '@/hooks/use-image'
import { Song } from '@/types/data'
import PlayButton from '@/components/ui/play-button'

interface SongItemProps {
  onClick: (id: string) => void
  song: Song
}

const SongItem: React.FC<SongItemProps> = ({ onClick, song }) => {
  const imageUrl = useImage(song)

  return (
    <div
      onClick={() => onClick(song.id)}
      className="group relative flex cursor-pointer flex-col gap-y-4 rounded-lg bg-zinc-400/5 p-4 transition-colors hover:bg-zinc-400/10"
    >
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-md">
        <Image src={imageUrl} alt={song.title} fill className="object-cover" />
      </div>
      <div className="flex flex-col">
        <h5 className="truncate text-sm font-medium leading-none">
          {song.title}
        </h5>
        <p className="truncate text-xs text-muted-foreground">
          By {song.author}
        </p>
      </div>
      <div className="absolute bottom-[72px] right-6">
        <PlayButton />
      </div>
    </div>
  )
}

export default SongItem
