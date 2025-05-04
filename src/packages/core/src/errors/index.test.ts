import { InvalidStateTransitionError } from '.'

test('With state name', () => {
  const expectedMessage = 'Invalid state transition from "A" to "B"'
  expect(new InvalidStateTransitionError('A', 'B').message).toBe(expectedMessage)
})

test('Without state name', () => {
  const expectedMessage = 'Invalid state transition from "A" to "B" in xyz'
  expect(new InvalidStateTransitionError('A', 'B', 'xyz').message).toBe(expectedMessage)
})
