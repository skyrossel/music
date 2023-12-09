import getSongs from '@/actions/get-songs'
import getSongsByTitle from '@/actions/get-songs-by-title'
import Box from '@/components/ui/box'
import Header from '@/components/ui/header'
import Heading from '@/components/ui/heading'
import SearchInput from './components/search-input'
import SearchContent from './components/content'

export const revalidate = 0

interface SearchProps {
  searchParams: {
    title: string
  }
}

export default async function Search({ searchParams }: SearchProps) {
  const songs = await getSongs()
  const searchSongs = await getSongsByTitle(searchParams.title)

  return (
    <Box className="flex flex-col gap-y-6 overflow-y-auto px-2 pt-5 md:px-5">
      <Header>
        <div className="flex flex-col gap-y-6">
          <Heading
            title="Search and uncover"
            description="A useful function for locating music conveniently."
          />
        </div>
        <SearchInput />
      </Header>
      <SearchContent songs={songs} searchSongs={searchSongs} />
    </Box>
  )
}
