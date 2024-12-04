import { NODE_CONSOLE_PLATFORM } from '../constants'
import { nodeCliAdapterResolver, nodeCliErrorHandlerResolver } from '../resolvers'
import { AdapterConfig, AdapterHandlerMiddleware, StoneBlueprint } from '@stone-js/core'

/**
 * Configuration interface for the Node Cli Adapter.
 *
 * Extends the `AdapterConfig` interface from the Stone.js framework and provides
 * customizable options specific to the Node Cli platform. This includes
 * alias, resolver, middleware, hooks, and various adapter state flags.
 */
export interface NodeCliAdapterConfig extends AdapterConfig {}

/**
 * Blueprint interface for the Node Cli Adapter.
 *
 * This interface extends `StoneBlueprint` and defines the structure of the
 * Node Cli adapter blueprint used in the Stone.js framework. It includes
 * a `stone` object with an array of `NodeCliAdapterConfig` items.
 */
export interface NodeCliAdapterBlueprint extends StoneBlueprint {}

/**
 * Default blueprint configuration for the Node Cli Adapter.
 *
 * This blueprint defines the initial configuration for the Node Cli adapter
 * within the Stone.js framework. It includes:
 * - An alias for the Node Cli platform (`Node_CLI_PLATFORM`).
 * - A default resolver function (currently a placeholder).
 * - Middleware, hooks, and state flags (`current`, `default`, `preferred`).
 */
export const nodeCliAdapterBlueprint: NodeCliAdapterBlueprint = {
  stone: {
    adapters: [
      {
        platform: NODE_CONSOLE_PLATFORM,
        resolver: nodeCliAdapterResolver,
        middleware: [
          { priority: 100, pipe: AdapterHandlerMiddleware }
        ],
        hooks: {},
        errorHandler: {
          resolver: nodeCliErrorHandlerResolver
        },
        current: false,
        default: false,
        preferred: false
      }
    ]
  }
}
