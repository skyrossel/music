import { Heart } from 'lucide-react'
import getSongs from '@/actions/get-songs'
import getLikedSongs from '@/actions/get-liked-songs'
import Box from '@/components/ui/box'
import Header from '@/components/ui/header'
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import Avatar from './components/avatar'
import LikedContent from './components/content'

export const revalidate = 0

export default async function Liked() {
  const songs = await getSongs()
  const likedSongs = await getLikedSongs()

  return (
    <Box className="flex flex-col gap-y-6 overflow-y-auto px-2 pt-5 md:px-5">
      <Header>
        <div className="flex items-center gap-x-4">
          <Button variant="outline" className="h-32 w-32">
            <Heart fill="red" stroke="red" className="h-14 w-14" />
          </Button>
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-col gap-y-1">
              <Heading
                title="Liked Songs"
                description="Playlist"
                className="flex-col-reverse"
              />
            </div>
            <div className="flex items-center gap-x-2">
              <Avatar />
              {likedSongs && (
                <span className="text-sm font-medium leading-none">
                  ({likedSongs.length})
                </span>
              )}
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} likedSongs={likedSongs} />
    </Box>
  )
}
