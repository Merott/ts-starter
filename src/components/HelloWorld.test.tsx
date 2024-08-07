import { describe, expect, test } from 'vitest'

import { HelloWorld } from './HelloWorld'
import { render, screen } from '@testing-library/react'

describe('HelloWorld', () => {
  test('renders "Hello World"', () => {
    render(<HelloWorld />)
    expect(screen.getByText(/hello world/i)).toBeInTheDocument()
  })
})
