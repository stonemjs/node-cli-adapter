import { RawResponse } from './declarations'
import { NodeCliAdapter } from './NodeCliAdapter'
import { NodeCliAdapterError } from './errors/NodeCliAdapterError'
import {
  AdapterHooks,
  AdapterResolver,
  defaultKernelResolver,
  defaultLoggerResolver,
  ErrorHandler,
  ErrorHandlerResolver,
  IBlueprint,
  LoggerResolver
} from '@stone-js/core'

/**
 * Resolves a logger for a blueprint.
 *
 * @param blueprint - The `IBlueprint` to retrieve the logger resolver from.
 * @returns A `LoggerResolver` for the given blueprint.
 */
const loggerResolver = (blueprint: IBlueprint): LoggerResolver => {
  return blueprint.get('stone.logger.resolver', defaultLoggerResolver)
}

/**
 * Error handler resolver for generic Node Cli adapter.
 *
 * Creates and configures an `ErrorHandler` for managing errors in the generic Node Cli adapter.
 *
 * @param blueprint - The `IBlueprint` providing configuration and dependencies.
 * @returns An `ErrorHandler` instance for handling Node Cli errors.
 */
export const nodeCliErrorHandlerResolver: ErrorHandlerResolver<RawResponse> = (
  blueprint: IBlueprint
): ErrorHandler<RawResponse> => {
  return ErrorHandler.create<RawResponse, NodeCliAdapterError>({
    blueprint,
    logger: loggerResolver(blueprint)(blueprint),
    renderResponseResolver: (error: NodeCliAdapterError): RawResponse => error.exitCode
  })
}

/**
 * Adapter resolver for generic Node Cli adapter.
 *
 * Creates and configures an `NodeCliAdapter` for handling generic events in Node Cli.
 *
 * @param blueprint - The `IBlueprint` providing configuration and dependencies.
 * @returns An `NodeCliAdapter` instance.
 */
export const nodeCliAdapterResolver: AdapterResolver = (blueprint: IBlueprint) => {
  const hooks = blueprint.get<AdapterHooks>('stone.adapter.hooks', {})
  const handlerResolver = blueprint.get('stone.kernel.resolver', defaultKernelResolver)
  const errorHandlerResolver = blueprint.get('stone.adapter.errorHandler.resolver', nodeCliErrorHandlerResolver)

  return NodeCliAdapter.create({
    hooks,
    blueprint,
    handlerResolver,
    logger: loggerResolver(blueprint)(blueprint),
    errorHandler: errorHandlerResolver(blueprint)
  })
}
