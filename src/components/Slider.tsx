import { createContext, type RefObject, useContext, useRef } from 'react'
import {
  type AriaSliderProps,
  type FocusRingAria,
  mergeProps,
  type SliderAria,
  useFocusRing,
  useNumberFormatter,
  useSlider,
  useSliderThumb,
  VisuallyHidden,
} from 'react-aria'
import { type SliderState, useSliderState } from 'react-stately'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

const slider = tv({
  variants: {
    orientation: {
      horizontal: 'h-1 w-full min-w-10',
      vertical: 'h-full min-h-10 w-1',
    },
  },
})

type SliderVariants = VariantProps<typeof slider>

export type SliderProps = Omit<AriaSliderProps<number>, 'label'> &
  SliderVariants & {
    children?:
      | React.ReactNode
      | ((state: {
          isFocusVisible: boolean
          isDisabled: boolean
          isThumbDragging: boolean
          formattedValue: string
        }) => React.ReactNode)
  }

export const Slider = {
  Root: SliderRoot,
  Track: SliderTrack,
  Thumb: SliderThumb,
  Label: SliderLabel,
  Output: SliderOutput,
}

const SliderContext = createContext<{
  trackRef: RefObject<HTMLDivElement>
  sliderAria: SliderAria
  state: SliderState
  focusRing: FocusRingAria
} | null>(null)

function useSliderContext() {
  const context = useContext(SliderContext)

  if (!context) {
    throw new Error('Slider.* components must be rendered inside Slider.Root')
  }

  return context
}

function SliderRoot({ children: childrenOrFn, ...sliderProps }: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const numberFormatter = useNumberFormatter()
  const state = useSliderState({ ...sliderProps, numberFormatter })
  const sliderAria = useSlider({ ...sliderProps, label: true }, state, trackRef)
  const focusRing = useFocusRing()

  const children =
    typeof childrenOrFn === 'function'
      ? childrenOrFn({
          isFocusVisible: focusRing.isFocusVisible,
          isDisabled: state.isDisabled,
          isThumbDragging: state.isThumbDragging(0),
          formattedValue: state.getThumbValueLabel(0),
        })
      : childrenOrFn

  return (
    <SliderContext.Provider value={{ focusRing, trackRef, sliderAria, state }}>
      <div {...sliderAria.groupProps}>{children}</div>
    </SliderContext.Provider>
  )
}

function SliderTrack(props: typeof sliderAria.trackProps) {
  const { trackRef, sliderAria, state } = useSliderContext()
  return (
    <div
      {...props}
      className={twMerge(
        `bg-gray-300`,
        slider({ orientation: state.orientation }),
        props.className,
      )}
      ref={trackRef}
      {...sliderAria.trackProps}
    />
  )
}

function SliderOutput(props: typeof sliderAria.outputProps) {
  const { sliderAria } = useSliderContext()

  return <output {...props} {...sliderAria.outputProps} />
}

function SliderThumb(props: typeof thumbProps) {
  const inputRef = useRef(null)
  const { trackRef, focusRing, state } = useSliderContext()
  const { thumbProps, inputProps, isDragging } = useSliderThumb(
    { trackRef, inputRef },
    state,
  )

  return (
    <div
      {...props}
      className={twMerge(
        `left-1/2 top-1/2 h-4 w-4 rounded-full`,
        focusRing.isFocusVisible
          ? 'bg-blue-500'
          : isDragging
            ? 'bg-gray-900'
            : 'bg-gray-700',
        props.className,
      )}
      {...thumbProps}
    >
      <VisuallyHidden>
        <input
          ref={inputRef}
          {...mergeProps(inputProps, focusRing.focusProps)}
        />
      </VisuallyHidden>
    </div>
  )
}

function SliderLabel(props: typeof sliderAria.labelProps) {
  const { sliderAria } = useSliderContext()
  return <label {...props} {...sliderAria.labelProps} />
}
