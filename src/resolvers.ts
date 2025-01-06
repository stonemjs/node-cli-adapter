import {
  IBlueprint,
  AdapterHooks,
  AdapterResolver,
  defaultKernelResolver,
  defaultLoggerResolver
} from '@stone-js/core'
import { NodeCliAdapter } from './NodeCliAdapter'

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
  const loggerResolver = blueprint.get('stone.logger.resolver', defaultLoggerResolver)

  return NodeCliAdapter.create({
    hooks,
    blueprint,
    handlerResolver,
    logger: loggerResolver(blueprint)
  })
}
