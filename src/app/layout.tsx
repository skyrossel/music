import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import '@/style/globals.css'

import getSongsByUserId from '@/actions/get-songs-by-user-id'
import { SupabaseProvider } from '@/providers/supabase-provider'
import { UserProvider } from '@/providers/user-provider'
import { ModalProvider } from '@/providers/modal-provider'
import Aside from '@/components/aside'
import Player from '@/components/ui/player'

const font = Quicksand({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Music',
  description:
    'Music is a music platform that provides a space for users to showcase and share their own music while also exploring and listening to music from other creators. Share and Explore.',
  authors: {
    name: 'Sky Rossel',
    url: 'https://github.com/skyrossel',
  },
}

export const revalidate = 0

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const songs = await getSongsByUserId()

  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Aside songs={songs}>{children}</Aside>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
