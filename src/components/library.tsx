'use client'

import { Disc, Plus } from 'lucide-react'
import { useUser } from '@/hooks/use-user'
import { useUpload } from '@/hooks/use-upload'
import { useSignIn } from '@/hooks/use-sign-in'
import { useOnPlay } from '@/hooks/use-on-play'
import { Song } from '@/types/data'
import MediaItem from '@/components/ui/media-item'

interface LibraryProps {
  songs: Song[]
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const { user } = useUser()

  const signIn = useSignIn()
  const upload = useUpload()

  const onPlay = useOnPlay(songs)

  const onClick = () => {
    if (!user) {
      signIn.onOpen()
      return alert(
        'First of all you need to login or register to upload the song',
      )
    }

    upload.onOpen()
  }

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-x-2">
          <Disc className="h-4 w-4" />
          <div className="text-base font-medium">Your Library</div>
        </div>
        <Plus onClick={onClick} className="h-4 w-4 cursor-pointer" />
      </div>
      {user ? (
        <>
          {songs.length ? (
            <div className="flex flex-col gap-y-4 px-6">
              {songs.map((song, index) => (
                <MediaItem
                  key={index}
                  onClick={(id: string) => onPlay(id)}
                  song={song}
                />
              ))}
            </div>
          ) : (
            <h5 className="px-6 text-sm font-medium leading-none">
              Your library is empty.
            </h5>
          )}
        </>
      ) : (
        <h5 className="px-6 text-sm font-medium leading-none">
          Sign in to access the library.
        </h5>
      )}
    </>
  )
}

export default Library
