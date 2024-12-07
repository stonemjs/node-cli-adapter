import { NODE_CONSOLE_PLATFORM } from '../constants'
import { CommandOptions } from '../decorators/Command'
import { CommandMiddleware } from '../middleware/configMiddleware'
import { CommandServiceProvider } from '../command/CommandServiceProvider'
import { RawResponseMiddleware } from '../middleware/RawResponseMiddleware'
import { IncomingEventMiddleware } from '../middleware/IncomingEventMiddleware'
import { nodeCliAdapterResolver, nodeCliErrorHandlerResolver } from '../resolvers'
import { AdapterConfig, AdapterHandlerMiddleware, BuilderConfig, ClassType, IProvider, StoneBlueprint } from '@stone-js/core'

/**
 * Configuration interface for the Node Cli Adapter.
 *
 * Extends the `AdapterConfig` interface from the Stone.js framework and provides
 * customizable options specific to the Node Cli platform. This includes
 * alias, resolver, middleware, hooks, and various adapter state flags.
 */
export interface NodeCliAdapterConfig extends AdapterConfig {
  router?: ClassType
  commands: Array<[ClassType, CommandOptions]>
}

/**
 * Blueprint interface for the Node Cli Adapter.
 *
 * This interface extends `StoneBlueprint` and defines the structure of the
 * Node Cli adapter blueprint used in the Stone.js framework. It includes
 * a `stone` object with an array of `NodeCliAdapterConfig` items.
 */
export interface NodeCliAdapterBlueprint extends StoneBlueprint {
  stone: {
    builder: BuilderConfig
    adapters: NodeCliAdapterConfig[]
    providers: Array<new (...args: any[]) => IProvider>
  }
}

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
    builder: {
      middleware: [
        { priority: 5, pipe: CommandMiddleware }
      ]
    },
    providers: [
      CommandServiceProvider
    ],
    adapters: [
      {
        platform: NODE_CONSOLE_PLATFORM,
        resolver: nodeCliAdapterResolver,
        middleware: [
          { priority: 0, pipe: IncomingEventMiddleware },
          { priority: 100, pipe: AdapterHandlerMiddleware },
          { priority: 200, pipe: RawResponseMiddleware }
        ],
        hooks: {},
        errorHandler: {
          resolver: nodeCliErrorHandlerResolver
        },
        current: false,
        default: false,
        preferred: false,
        commands: []
      }
    ]
  }
}
