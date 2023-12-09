import * as React from 'react'
import { X } from 'lucide-react'
import { Modal as ModalComponent } from '@mui/base/Modal'
import clsx from 'clsx'

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
  description,
}) => {
  return (
    <ModalComponent
      open={isOpen}
      onClose={onClose}
      data-state={isOpen ? 'open' : 'close'}
      slots={{ backdrop: Backdrop }}
    >
      <div
        data-state={isOpen ? 'open' : 'close'}
        className="bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg md:w-full"
      >
        <div
          onClick={onClose}
          className="ring-offset-background focus:ring-ring absolute right-4 top-4 cursor-pointer rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </div>
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        {children}
      </div>
    </ModalComponent>
  )
}

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props
  return (
    <div
      ref={ref}
      data-state={open ? 'open' : 'close'}
      className={clsx(
        { 'MuiBackdrop-open': open },
        'bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 backdrop-blur-sm',
      )}
      {...other}
    />
  )
})
Backdrop.displayName = 'Backdrop'

export { Modal }
