'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Search, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Song } from '@/types/data'
import Box from '@/components/ui/box'
import { buttonVariants } from '@/components/ui/button'
import Library from '@/components/library'

interface AsideProps {
  children: React.ReactNode
  songs: Song[]
}

const Aside: React.FC<AsideProps> = ({ children, songs }) => {
  const pathname = usePathname()

  const routes = [
    {
      icon: <Home className="h-4 w-4" />,
      active: pathname === '/',
      href: '/',
      label: 'Home',
    },
    {
      icon: <Search className="h-4 w-4" />,
      active: pathname === '/search',
      href: '/search?title=',
      label: 'Search',
    },
  ]

  return (
    <div className="flex h-full items-center">
      <aside className="hidden h-full flex-col gap-y-2 p-2 md:flex md:w-1/2 lg:w-1/3">
        <Box className="h-fit pb-0">
          <div className="flex flex-col gap-y-2 p-4">
            {routes.map((route, index) => (
              <Link
                key={index}
                href={route.href}
                className={buttonVariants({
                  className: cn(
                    '!justify-start',
                    route.active
                      ? 'text-primary-foreground'
                      : 'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
                  ),
                })}
              >
                {route.icon}
                <span className="ml-2">{route.label}</span>
              </Link>
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto pb-0">
          <Library songs={songs} />
        </Box>
      </aside>
      <main className="h-full w-full md:p-2 md:pl-0">{children}</main>
    </div>
  )
}

export default Aside
