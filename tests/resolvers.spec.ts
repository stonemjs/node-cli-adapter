import { Config } from '@stone-js/config'
import { NodeCliAdapter } from '../src/NodeCliAdapter'
import { NodeCliAdapterError } from '../src/errors/NodeCliAdapterError'
import { nodeCliAdapterResolver, nodeCliErrorHandlerResolver } from '../src/resolvers'

const mockBlueprint = Config.create()

describe('NodeCliAdapter Resolvers', () => {
  describe('nodeCliErrorHandlerResolver', () => {
    it('should create an ErrorHandler and populate server response with `CliError` when there is a context', () => {
      const rawResponse = {}
      const cliError = { exitCode: 1 } as unknown as Error
      const handler = nodeCliErrorHandlerResolver(mockBlueprint)
      expect(handler.render(new NodeCliAdapterError('simple error', { cause: cliError, metadata: { rawResponse, rawEvent: {} } }))).toBe(1)
      // @ts-expect-error - Invalid error type for testing purposes
      expect(handler.render(new NodeCliAdapterError('simple error', { cause: { exitCode: undefined }, metadata: { rawResponse, rawEvent: {} } }))).toBe(1)
    })
  })

  describe('nodeCliAdapterResolver', () => {
    it('should create an adapter instance with the correct configuration', () => {
      const adapter = nodeCliAdapterResolver(mockBlueprint)
      expect(adapter).toBeInstanceOf(NodeCliAdapter)
    })
  })
})
