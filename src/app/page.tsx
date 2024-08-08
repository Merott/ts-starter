'use client'

import { HelloWorld } from '@/components/HelloWorld'
import { NativeSelect } from '@/components/NativeSelect'
import { Slider } from '@/components/Slider'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Home() {
  const [sliderValue, setSliderValue] = useState(50)

  return (
    <main className="flex min-h-screen flex-col items-start gap-16 p-24">
      <div className="border-2 border-current p-6">
        <HelloWorld wide uppercase />
      </div>

      <div className="flex gap-12">
        <NativeSelect>
          <option>Apple</option>
          <option>Banana</option>
          <option>Carrot</option>
        </NativeSelect>

        <NativeSelect corners="sharp" variant="filled">
          <option>Apple</option>
          <option>Banana</option>
          <option>Carrot</option>
        </NativeSelect>
      </div>

      <Slider.Root
        // orientation="vertical"
        value={sliderValue}
        onChange={value => {
          setSliderValue(value)
        }}
      >
        {({ isFocusVisible, isThumbDragging, formattedValue }) => (
          <div className="flex w-48 flex-col gap-4">
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <Slider.Label>Opacity</Slider.Label>
              <Slider.Output
                className="font-medium"
                style={{ opacity: sliderValue / 100 }}
              >
                {formattedValue}
              </Slider.Output>
            </div>
            <Slider.Track className="rounded-full">
              <Slider.Thumb
                className={twMerge(
                  'h-3 w-3',
                  isFocusVisible && 'bg-blue-500',
                  isThumbDragging && 'bg-green-500',
                )}
              />
            </Slider.Track>
          </div>
        )}
      </Slider.Root>
    </main>
  )
}
