'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col gap-y-4">
        <Heading
          title="Error"
          description="Something went wrong. Please try later."
        />
        <div className="h-[1px] w-full shrink-0 bg-border" />
        <Button onClick={() => router.back()}>Back</Button>
      </div>
    </div>
  )
}
