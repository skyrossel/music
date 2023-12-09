'use client'

import Image from 'next/image'
import { useUser } from '@/hooks/use-user'

const Avatar = () => {
  const { user } = useUser()

  return (
    <div className="flex items-center gap-x-2">
      <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <Image
          src={user?.user_metadata.avatar_url}
          alt={user?.user_metadata.full_name}
          fill
          className="object-cover"
        />
      </div>
      <h5 className="text-sm font-medium leading-none">
        {user?.user_metadata.full_name}
      </h5>
    </div>
  )
}

export default Avatar
