import {
  AdapterEventBuilder,
  AdapterOptions,
  IncomingEvent,
  OutgoingResponse
} from '@stone-js/core'
import { RawResponse } from '../src/declarations'
import { NodeCliAdapter } from '../src/NodeCliAdapter'
import { RawResponseWrapper } from '../src/RawResponseWrapper'
import { NodeCliAdapterError } from '../src/errors/NodeCliAdapterError'

vi.mock('../src/RawResponseWrapper', () => ({
  RawResponseWrapper: {
    create: vi.fn()
  }
}))

describe('NodeCliAdapter', () => {
  let adapterOptions: AdapterOptions<RawResponse, IncomingEvent, OutgoingResponse>

  beforeEach(() => {
    adapterOptions = {
      hooks: {},
      blueprint: {
        get: vi.fn()
      },
      handlerResolver: vi.fn(),
      logger: {
        error: vi.fn()
      },
      errorHandler: {
        render: vi.fn(),
        report: vi.fn()
      }
    } as any
  })

  it('should create an instance with correct https configuration', () => {
    const adapter = NodeCliAdapter.create(adapterOptions)
    expect(adapter).toBeInstanceOf(NodeCliAdapter)
  })

  it('should throw error when used outside Node Cli context', async () => {
    const adapter = NodeCliAdapter.create(adapterOptions)

    global.window = {} as any // Simulate browser context

    await expect(adapter.run()).rejects.toThrow(NodeCliAdapterError)

    delete (global as any).window // Cleanup
  })

  it('should call the appropriate event listener on request', async () => {
    const adapter = NodeCliAdapter.create(adapterOptions)

    IncomingEvent.create = vi.fn()
    RawResponseWrapper.create = vi.fn()
    AdapterEventBuilder.create = vi.fn((options) => options.resolver({}))
    // @ts-expect-error
    adapter.sendEventThroughDestination = vi.fn()

    const rawResponse = await adapter.run()

    expect(rawResponse).toBeUndefined()
    expect(AdapterEventBuilder.create).toHaveBeenCalled()
    // @ts-expect-error
    expect(adapter.sendEventThroughDestination).toHaveBeenCalled()
    expect(RawResponseWrapper.create).toHaveBeenCalledWith(expect.anything())
  })
})
