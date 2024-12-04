import { RawResponse } from '../src/declarations'
import { RawResponseWrapper } from '../src/RawResponseWrapper'

describe('RawResponseWrapper', () => {
  let mockResponseOptions: { exitCode: RawResponse }

  beforeEach(() => {
    // Mock the ServerResponse object
    mockResponseOptions = { exitCode: 0 }
  })

  it('should set exit code when options are provided', () => {
    const wrapper = RawResponseWrapper.create(mockResponseOptions)

    const rawResponse = wrapper.respond()

    expect(rawResponse).toEqual(0)
  })

  it('should handle missing options gracefully', () => {
    const wrapper = RawResponseWrapper.create({})

    const rawResponse = wrapper.respond()

    expect(rawResponse).toBeNaN()
    expect(rawResponse).not.toEqual(mockResponseOptions)
  })
})
