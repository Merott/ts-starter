import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { Slider } from './Slider'

describe('Slider', () => {
  test('renders a Slider component with initial value', () => {
    render(
      <Slider.Root value={23} minValue={0} maxValue={100}>
        <Slider.Label>Volume</Slider.Label>
        <Slider.Track>
          <Slider.Thumb />
        </Slider.Track>
        <Slider.Output />
      </Slider.Root>,
    )

    const slider = screen.getByRole('slider')
    const input = screen.getByLabelText('Volume', { selector: 'input' })

    expect(input).toBe(slider)
    expect(slider).toHaveValue('23')
    expect(slider).toHaveAttribute('min', '0')
    expect(slider).toHaveAttribute('max', '100')
  })

  // ----------------------------------------------
  // The rest of these tests were written by Claude

  test('updates value when user interacts with the slider', async () => {
    const user = userEvent.setup()
    render(
      <Slider.Root defaultValue={50} minValue={0} maxValue={100}>
        <Slider.Label>Volume</Slider.Label>
        <Slider.Track>
          <Slider.Thumb />
        </Slider.Track>
        <Slider.Output />
      </Slider.Root>,
    )

    const slider = screen.getByRole('slider')
    await user.tab()
    expect(slider).toHaveFocus()

    // Simulate moving the slider to the right
    await user.keyboard('{ArrowRight}')
    expect(slider).toHaveValue('51')

    // Simulate moving the slider to the left
    await user.keyboard('{ArrowLeft}')
    expect(slider).toHaveValue('50')
  })

  test('renders custom thumb based on slider state', () => {
    render(
      <Slider.Root defaultValue={50} minValue={0} maxValue={100}>
        {({ isFocusVisible, isDisabled, isThumbDragging, formattedValue }) => (
          <>
            <Slider.Label>Volume</Slider.Label>
            <Slider.Track>
              <Slider.Thumb
                className={
                  isFocusVisible
                    ? 'focus-visible'
                    : isThumbDragging
                      ? 'dragging'
                      : ''
                }
              />
            </Slider.Track>
            <div data-testid="custom-output">
              {formattedValue} {isDisabled ? '(disabled)' : ''}
            </div>
          </>
        )}
      </Slider.Root>,
    )

    expect(screen.getByTestId('custom-output')).toHaveTextContent('50')
  })

  test('respects minValue and maxValue', async () => {
    const user = userEvent.setup()

    render(
      <Slider.Root defaultValue={0} minValue={0} maxValue={10}>
        <Slider.Label>Volume</Slider.Label>
        <Slider.Track>
          <Slider.Thumb />
        </Slider.Track>
      </Slider.Root>,
    )

    const slider = screen.getByRole('slider')
    await user.tab()

    // Try to go below minValue
    await user.keyboard('{ArrowLeft}')
    expect(slider).toHaveValue('0')

    // Go to maxValue
    for (let i = 0; i < 11; i++) {
      await user.keyboard('{ArrowRight}')
    }
    expect(slider).toHaveValue('10')

    // Try to exceed maxValue
    await user.keyboard('{ArrowRight}')
    expect(slider).toHaveValue('10')
  })

  test('handles disabled state', () => {
    render(
      <Slider.Root defaultValue={50} minValue={0} maxValue={100} isDisabled>
        <Slider.Label>Volume</Slider.Label>
        <Slider.Track>
          <Slider.Thumb />
        </Slider.Track>
      </Slider.Root>,
    )

    const slider = screen.getByRole('slider')
    expect(slider).toBeDisabled()
  })
})
