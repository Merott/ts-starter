import { ChevronDown } from '@/icons/chevron-down'
import { tv, type VariantProps } from 'tailwind-variants'

const nativeSelect = tv({
  base: 'select-none appearance-none border py-2 pl-4 pr-10 focus:border-blue-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800',
  variants: {
    variant: {
      default: 'border-gray-200',
      filled: 'border-transparent bg-gray-100',
    },
    corners: {
      sharp: '',
      rounded: 'rounded-lg',
    },
  },
})

type NativeSelectProps = React.ComponentProps<'select'> &
  VariantProps<typeof nativeSelect>

export function NativeSelect({
  corners = 'rounded',
  variant = 'default',
  ...props
}: NativeSelectProps) {
  return (
    <div className="relative">
      <select {...props} className={nativeSelect({ corners, variant })} />

      <span className="pointer-events-none absolute right-3 top-0 flex h-full flex-col items-center justify-center">
        <ChevronDown className="size-4" />
      </span>
    </div>
  )
}
