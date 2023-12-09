'use client'

import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'
import { useUser } from '@/hooks/use-user'
import { useSignIn } from '@/hooks/use-sign-in'
import { Button } from '@/components/ui/button'

const LikedSongs = () => {
  const router = useRouter()

  const { user } = useUser()

  const signIn = useSignIn()

  const onClick = () => {
    if (!user) {
      signIn.onOpen()
      return alert(
        'First of all you need to login or register to have liked songs',
      )
    }

    router.push('/liked')
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Button
        onClick={onClick}
        variant="outline"
        className="group relative min-h-[64px] min-w-[64px] justify-start gap-x-2"
      >
        <Heart fill="red" stroke="red" className="h-5 w-5" />
        Liked Songs
      </Button>
    </div>
  )
}

export default LikedSongs
