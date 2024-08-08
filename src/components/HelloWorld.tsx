import { tv, type VariantProps } from 'tailwind-variants'

const helloWorld = tv({
  base: 'text-2xl font-semibold',
  variants: {
    wide: { true: 'tracking-widest' },
    uppercase: { true: 'uppercase' },
  },
})

type HelloWorldProps = VariantProps<typeof helloWorld>

export function HelloWorld({ wide, uppercase }: HelloWorldProps) {
  return <p className={helloWorld({ wide, uppercase })}>Hello World</p>
}
