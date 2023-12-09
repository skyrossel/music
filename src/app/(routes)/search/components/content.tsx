'use client'

import { PlusCircle, SearchSlash } from 'lucide-react'
import { useUser } from '@/hooks/use-user'
import { useSignIn } from '@/hooks/use-sign-in'
import { useUpload } from '@/hooks/use-upload'
import { useOnPlay } from '@/hooks/use-on-play'
import { Song } from '@/types/data'
import Message from '@/components/ui/message'
import MediaItem from '@/components/ui/media-item'
import LikeButton from '@/components/ui/like-button'

interface SearchContentProps {
  songs: Song[]
  searchSongs: Song[]
}

const SearchContent: React.FC<SearchContentProps> = ({
  songs,
  searchSongs,
}) => {
  const { user } = useUser()

  const signIn = useSignIn()
  const upload = useUpload()

  const onPlay = useOnPlay(songs)

  const onClick = () => {
    if (!user) {
      return signIn.onOpen()
    }

    upload.onOpen()
  }

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

  if (searchSongs.length === 0) {
    return (
      <Message
        icon={<SearchSlash className="h-10 w-10 text-muted-foreground" />}
        onClick={onClick}
        title="Song not found"
        description="Users have not yet added such a song to find it. Add one below."
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
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {searchSongs.map((searchSong, index) => (
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
                  song={searchSong}
                />
              </td>
              <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                <LikeButton songId={searchSong.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SearchContent
