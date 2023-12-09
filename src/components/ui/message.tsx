import { Button } from '@/components/ui/button'

interface MessageProps {
  icon: React.ReactElement
  onClick: () => void
  title: string
  description: string
}

const Message: React.FC<MessageProps> = ({
  icon,
  onClick,
  title,
  description,
}) => {
  return (
    <div className="flex h-full items-center justify-center rounded-md border border-dashed p-4">
      <div className="flex flex-col items-center justify-center gap-y-4 text-center">
        {icon}
        <div className="flex flex-col gap-y-2">
          <div className="text-lg font-semibold leading-none tracking-tight">
            {title}
          </div>
          <div className="text-muted-foreground text-sm">{description}</div>
        </div>
        <Button onClick={onClick} variant="white">
          Add a song
        </Button>
      </div>
    </div>
  )
}

export default Message
