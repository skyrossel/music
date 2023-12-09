import getSongs from '@/actions/get-songs'
import Box from '@/components/ui/box'
import Header from '@/components/ui/header'
import Heading from '@/components/ui/heading'
import LikedSongs from '@/components/liked-songs'
import HomeContent from './components/content'

export const revalidate = 0

export default async function Home() {
  const songs = await getSongs()

  return (
    <Box className="flex flex-col gap-y-6 overflow-y-auto px-2 pt-5 md:px-5">
      <Header>
        <div className="flex flex-col gap-y-6">
          <Heading
            title="Share and Explore"
            description="Top picks for users, updated daily."
          />
          <LikedSongs />
        </div>
      </Header>
      <div className="flex flex-col gap-y-4">
        <h3 className="text-lg font-semibold leading-none tracking-tight">
          Newest songs
        </h3>
        <div className="h-[1px] w-full shrink-0 bg-border" />
      </div>
      <HomeContent songs={songs} />
    </Box>
  )
}
