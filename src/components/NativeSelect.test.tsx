import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { NativeSelect } from './NativeSelect'

describe('Select', () => {
  test('allows the user to select a value from multiple options', () => {
    render(
      <NativeSelect>
        <option>Apple</option>
        <option>Banana</option>
        <option>Carrot</option>
      </NativeSelect>,
    )

    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()

    fireEvent.change(select, { target: { value: 'Banana' } })
    expect(select).toHaveValue('Banana')
  })
})
