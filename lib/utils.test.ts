import { describe, expect, test } from 'vitest'
import { sum } from '~/utils'

describe('sum()', () => {
  test('adds numbers', () => {
    expect(sum(1, 2, 3)).toEqual(6)
  })

  test('handles a single number', () => {
    expect(sum(5)).toEqual(5)
  })

  test('handles negative numbers', () => {
    expect(sum(-1, -2, 4)).toEqual(1)
  })

  test('returns 0 for an empty arguments list', () => {
    expect(sum()).toEqual(0)
  })

  test('throws an error if given non-number values', () => {
    expect(() => {
      // @ts-expect-error: passing invalid values for testing
      sum(1, '2', true)
    }).toThrow()
  })
})
