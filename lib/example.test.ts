import { expect, test } from 'vitest'
import { example } from '~/example'

test('example', () => {
  expect(example()).toBe('ts-starter')
})
