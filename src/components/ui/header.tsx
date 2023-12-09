'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Search, Home, Plus } from 'lucide-react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useUser } from '@/hooks/use-user'
import { useSignIn } from '@/hooks/use-sign-in'
import { useSignUp } from '@/hooks/use-sign-up'
import { useUpload } from '@/hooks/use-upload'
import { Button, buttonVariants } from '@/components/ui/button'

interface HeaderProps {
  children: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const pathname = usePathname()
  const router = useRouter()

  const supabaseClient = useSupabaseClient()

  const { user } = useUser()

  const signIn = useSignIn()
  const signUp = useSignUp()
  const upload = useUpload()

  const onClick = async () => {
    const { error } = await supabaseClient.auth.signOut()

    if (error) {
      alert(error.message)
    } else {
      alert('You have successfully logged out')
    }

    router.refresh()
    router.replace('/')
  }

  const onUpload = () => {
    if (!user) {
      signIn.onOpen()
      return alert(
        'First of all you need to login or register to upload the song',
      )
    }

    upload.onOpen()
  }

  return (
    <div className="flex h-fit flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="hidden items-center gap-x-2 md:flex">
          <Button
            disabled={pathname === '/'}
            onClick={() => router.back()}
            variant="outline"
            size="icon"
            title="Back"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            disabled={pathname !== '/'}
            onClick={() => router.forward()}
            variant="outline"
            size="icon"
            title="Forward"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-x-2 md:hidden">
          <Link
            href="/"
            className={buttonVariants({
              variant: 'outline',
              size: 'icon',
            })}
          >
            <Home className="h-5 w-5" />
          </Link>
          <Link
            href="/search?title="
            className={buttonVariants({
              variant: 'outline',
              size: 'icon',
            })}
          >
            <Search className="h-5 w-5" />
          </Link>
          <Button onClick={onUpload} variant="outline" size="icon">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-x-2">
          {user ? (
            <Button onClick={onClick} variant="destructive">
              Sing out
            </Button>
          ) : (
            <>
              <Button onClick={() => signIn.onOpen()} variant="ghost">
                Sing in
              </Button>
              <Button onClick={() => signUp.onOpen()} variant="white">
                Sing up
              </Button>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header
