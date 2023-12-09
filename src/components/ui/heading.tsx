import { cn } from '@/lib/utils'

interface HeadingProps {
  title: String
  description: String
  className?: string
}

const Heading: React.FC<HeadingProps> = ({ title, description, className }) => {
  return (
    <div className={cn('flex flex-col', className)}>
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
        {title}
      </h2>
      <p className="text-muted-foreground text-xs sm:text-sm md:text-base md:leading-7">
        {description}
      </p>
    </div>
  )
}

export default Heading
