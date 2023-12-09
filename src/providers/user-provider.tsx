'use client'

import { UserContextProvider } from '@/providers/user-context-provider'

interface UserProviderProps {
  children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  return <UserContextProvider>{children}</UserContextProvider>
}
