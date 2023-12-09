'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { useUser } from '@/hooks/use-user'
import { useSignIn } from '@/hooks/use-sign-in'
import { Button } from '@/components/ui/button'

interface LikeButtonProps {
  songId: string
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter()

  const [liked, setLiked] = useState(false)

  const { supabaseClient } = useSessionContext()

  const { user } = useUser()

  const signIn = useSignIn()

  const onClick = async () => {
    if (!user) {
      return signIn.onOpen()
    }

    if (liked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId)

      if (error) {
        return alert(error.message)
      }

      setLiked(false)
      alert('You have successfully deleted your liked song')
    } else {
      const { error } = await supabaseClient.from('liked_songs').insert({
        user_id: user.id,
        song_id: songId,
      })

      if (error) {
        return alert(error.message)
      }

      setLiked(true)
      alert('You have successfully added your liked song')
    }

    router.refresh()
  }

  useEffect(() => {
    if (!user?.id) {
      return
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single()

      if (data) {
        if (error) {
          return alert(error.message)
        }

        setLiked(true)
      }
    }

    fetchData()
  }, [user?.id, supabaseClient, songId])

  return (
    <Button onClick={onClick} variant="ghost" size="icon">
      <Heart
        fill={liked ? 'red' : 'transparent'}
        stroke={liked ? 'red' : 'currentColor'}
      />
    </Button>
  )
}

export default LikeButton
