'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { HeartOff, PlusCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useUser } from '@/hooks/use-user'
import { useUpload } from '@/hooks/use-upload'
import { useOnPlay } from '@/hooks/use-on-play'
import { Song } from '@/types/data'
import Message from '@/components/ui/message'
import MediaItem from '@/components/ui/media-item'
import LikeButton from '@/components/ui/like-button'

interface LikedContentProps {
  songs: Song[]
  likedSongs: Song[]
}

const LikedContent: React.FC<LikedContentProps> = ({ songs, likedSongs }) => {
  const router = useRouter()

  const { isLoading, user } = useUser()

  const upload = useUpload()

  const onPlay = useOnPlay(songs)

  const formatDate = (date: string) => {
    const parsedDate = new Date(date)

    const formattedDate = formatDistanceToNow(parsedDate)

    return formattedDate
  }

  const onClick = () => {
    if (likedSongs.length === 0) {
      return router.push('/search?title=')
    }

    upload.onOpen()
  }

  useEffect(() => {
    if (!isLoading && !user) {
      return router.replace('/')
    }
  }, [isLoading, user, router])

  if (songs.length === 0) {
    return (
      <Message
        icon={<PlusCircle className="h-10 w-10 text-muted-foreground" />}
        onClick={onClick}
        title="No songs have been added yet"
        description="Users have not added any songs yet. Add one below."
      />
    )
  }

  if (likedSongs.length === 0) {
    return (
      <Message
        icon={<HeartOff className="h-10 w-10 text-muted-foreground" />}
        onClick={onClick}
        title="No liked songs found"
        description="You have not added your liked songs yet. Add one below."
      />
    )
  }

  return (
    <div className="relative w-full">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
              #
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
              Title
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
              Date added
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {likedSongs.map((likedSong, index) => (
            <tr
              key={index}
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
              <td className="w-5 p-2 align-middle text-base text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                {index + 1}
              </td>
              <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                <MediaItem
                  onClick={(id: string) => onPlay(id)}
                  song={likedSong}
                />
              </td>
              <td className="p-2 text-center align-middle text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                {formatDate(likedSong.created_at)}
              </td>
              <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                <LikeButton songId={likedSong.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LikedContent
