export function sum(...numbers: number[]) {
  let total = 0

  for (const number of numbers) {
    if (typeof number !== 'number' || isNaN(number)) {
      throw new Error('Cannot sum non-numbers')
    }

    total += number
  }

  return total
}
