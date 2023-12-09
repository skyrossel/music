'use client'

import { createContext, useCallback, useEffect, useState } from 'react'
import { useSessionContext, useUser, User } from '@supabase/auth-helpers-react'
import { UserDetails } from '@/types/data'

type UserContextType = {
  isLoading: boolean
  user: User | null
  userDetails: UserDetails | null
  accessToken: string | null
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export interface Props {
  [propName: string]: any
}

export const UserContextProvider = (props: Props) => {
  const {
    isLoading: isLoadingUser,
    session,
    supabaseClient,
  } = useSessionContext()

  const [isLoadingData, setIsLoadingData] = useState(false)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)

  const user = useUser()
  const accessToken = session?.access_token ?? null

  const getUserDetails = useCallback(() => {
    return supabaseClient.from('users').select('*').single()
  }, [supabaseClient])

  useEffect(() => {
    if (!isLoadingData && user && !userDetails) {
      setIsLoadingData(true)

      Promise.allSettled([getUserDetails()]).then((result) => {
        const userDetailsPromise = result[0]

        if (userDetailsPromise.status === 'fulfilled') {
          setUserDetails(userDetailsPromise.value.data)
        }

        setIsLoadingData(false)
      })
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null)
    }
  }, [isLoadingUser, isLoadingData, user, userDetails, getUserDetails])

  const value = {
    isLoading: isLoadingUser || isLoadingData,
    user,
    userDetails,
    accessToken,
  }

  return <UserContext.Provider value={value} {...props} />
}
