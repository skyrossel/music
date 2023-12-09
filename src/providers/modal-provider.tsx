'use client'

import { useEffect, useState } from 'react'
import SignIn from '@/components/modals/sign-in'
import SignUp from '@/components/modals/sign-up'
import Upload from '@/components/modals/upload'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <SignIn />
      <SignUp />
      <Upload />
    </>
  )
}
