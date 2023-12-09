'use client'

import { PlusCircle } from 'lucide-react'
import { useUser } from '@/hooks/use-user'
import { useSignIn } from '@/hooks/use-sign-in'
import { useUpload } from '@/hooks/use-upload'
import { useOnPlay } from '@/hooks/use-on-play'
import { Song } from '@/types/data'
import Message from '@/components/ui/message'
import SongItem from '@/components/ui/song-item'

interface HomeContentProps {
  songs: Song[]
}

const HomeContent: React.FC<HomeContentProps> = ({ songs }) => {
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

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {songs.map((song, index) => (
        <SongItem
          key={index}
          onClick={(id: string) => onPlay(id)}
          song={song}
        />
      ))}
    </div>
  )
}

export default HomeContent
