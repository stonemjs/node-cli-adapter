import { NODE_CONSOLE_PLATFORM } from '../constants'
import { nodeCliAdapterResolver } from '../resolvers'
import { CommandOptions } from '../decorators/Command'
import { NodeCliErrorHandler } from '../NodeCliErrorHandler'
import { CommandMiddleware } from '../middleware/configMiddleware'
import { CommandServiceProvider } from '../command/CommandServiceProvider'
import { RawResponseMiddleware } from '../middleware/RawResponseMiddleware'
import { IncomingEventMiddleware } from '../middleware/IncomingEventMiddleware'
import { AdapterConfig, AppConfig, ClassType, StoneBlueprint } from '@stone-js/core'

/**
 * Configuration interface for the Node Cli Adapter.
 *
 * Extends the `AdapterConfig` interface from the Stone.js framework and provides
 * customizable options specific to the Node Cli platform. This includes
 * alias, resolver, middleware, hooks, and various adapter state flags.
 */
export interface NodeCliAdapterConfig extends AdapterConfig {
  commands: Array<[ClassType, CommandOptions]>
}

/**
 * Represents the NodeCli configuration options for the application.
 */
export interface NodeCliAdapterAppConfig extends Partial<AppConfig> {
  adapters: NodeCliAdapterConfig[]
}

/**
 * Blueprint interface for the Node Cli Adapter.
 *
 * This interface extends `StoneBlueprint` and defines the structure of the
 * Node Cli adapter blueprint used in the Stone.js framework. It includes
 * a `stone` object with an array of `NodeCliAdapterConfig` items.
 */
export interface NodeCliAdapterBlueprint extends StoneBlueprint {
  stone: NodeCliAdapterAppConfig
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
        { priority: 1, pipe: CommandMiddleware }
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
          { priority: 10, pipe: RawResponseMiddleware }
        ],
        hooks: {},
        commands: [],
        errorHandlers: {
          default: NodeCliErrorHandler
        },
        current: false,
        default: false
      }
    ]
  }
}
