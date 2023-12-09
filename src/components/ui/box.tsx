'use client'

import { usePlayer } from '@/hooks/use-player'
import { cn } from '@/lib/utils'

interface BoxProps {
  children: React.ReactNode
  className?: string
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  const player = usePlayer()

  return (
    <div
      className={cn(
        'h-full w-full border bg-secondary shadow-sm md:rounded-lg',
        player.activeId ? 'pb-[5.25rem]' : 'pb-5',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Box
