import * as React from 'react'
import { Slider as BaseSlider, SliderProps } from '@mui/base/Slider'

interface VolumeSliderProps {
  value: number
  onChange: (value: number) => void
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ value, onChange }) => {
  const handleChange = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      onChange(newValue[0])
    } else {
      onChange(newValue)
    }
  }

  return (
    <Slider
      aria-label="Volume"
      defaultValue={[1]}
      value={value}
      onChange={handleChange}
      step={0.1}
      max={1}
    />
  )
}

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn

const Slider = React.forwardRef<HTMLSpanElement, SliderProps>((props, ref) => {
  return (
    <BaseSlider
      ref={ref}
      {...props}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState,
          )
          return {
            ...resolvedSlotProps,
            className: 'h-1.5 w-full py-4 inline-block relative touch-none',
          }
        },
        rail: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.rail,
            ownerState,
          )
          return {
            ...resolvedSlotProps,
            className:
              'block absolute w-full h-1 rounded-sm bg-current opacity-40',
          }
        },
        track: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.track,
            ownerState,
          )

          return {
            ...resolvedSlotProps,
            className: 'block absolute h-1 rounded-sm bg-current',
          }
        },
        thumb: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.thumb,
            ownerState,
          )
          return {
            ...resolvedSlotProps,
            className:
              'absolute w-4 h-4 -ml-1.5 -mt-1.5 box-border rounded-full outline-0 border-[3px] border-solid border-current bg-white cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
          }
        },
      }}
    />
  )
})
Slider.displayName = 'Slider'

export { VolumeSlider }
