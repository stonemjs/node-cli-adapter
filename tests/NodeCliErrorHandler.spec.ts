import { NodeCliErrorHandler } from '../src/NodeCliErrorHandler'
import { IntegrationError, AdapterErrorContext, ILogger } from '@stone-js/core'

describe('NodeCliErrorHandler', () => {
  let mockLogger: ILogger
  let handler: NodeCliErrorHandler
  let mockContext: AdapterErrorContext<any, any, any>

  beforeEach(() => {
    mockLogger = {
      error: vi.fn()
    } as unknown as ILogger

    mockContext = {
      rawEvent: {},
      rawResponseBuilder: {
        add: vi.fn().mockReturnThis(),
        build: vi.fn().mockReturnValue({
          respond: vi.fn().mockResolvedValue(500)
        })
      }
    } as unknown as AdapterErrorContext<any, any, any>

    handler = new NodeCliErrorHandler({ logger: mockLogger })
  })

  test('should throw an IntegrationError if logger is not provided', () => {
    expect(() => new NodeCliErrorHandler({ logger: undefined as any })).toThrowError(IntegrationError)
  })

  test('should handle an error and return a response with correct headers', async () => {
    const error = new Error('Something went wrong')

    const response = await handler.handle(error, mockContext)

    expect(mockContext.rawResponseBuilder.add).toHaveBeenCalledWith(
      'exitCode',
      500
    )
    expect(mockLogger.error).toHaveBeenCalledWith('Something went wrong', { error })
    expect(response).toBe(500)
  })
})
