import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface PlayButtonProps {
  className?: string
}

const PlayButton: React.FC<PlayButtonProps> = ({ className }) => {
  return (
    <Button
      variant="white"
      className={cn(
        'translate h-max w-max translate-y-1/4 rounded-full p-3 opacity-0 transition hover:scale-110 group-hover:translate-y-0 group-hover:opacity-100',
        className,
      )}
    >
      <Play className="h-4 w-4" />
    </Button>
  )
}

export default PlayButton
