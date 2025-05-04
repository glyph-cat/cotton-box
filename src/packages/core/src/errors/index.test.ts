import { InvalidStateTransitionError } from '.'

test('With state name', () => {
  const expectedMessage = 'from "A" to "B" in unnamed state'
  expect(new InvalidStateTransitionError('A', 'B').message).toBe(expectedMessage)
})

test('Without state name', () => {
  const expectedMessage = 'from "A" to "B" in ExampleState'
  expect(new InvalidStateTransitionError('A', 'B', 'ExampleState').message).toBe(expectedMessage)
})
