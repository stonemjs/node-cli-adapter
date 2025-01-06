import { NextPipe } from '@stone-js/pipeline'
import { COMMAND_KEY } from '../decorators/constants'
import { CommandOptions } from '../decorators/Command'
import { ConfigContext, IBlueprint, ClassType, hasMetadata, getMetadata } from '@stone-js/core'

/**
 * Middleware to process and register modules as command handlers.
 *
 * @param configContext - The configuration context containing the modules and blueprint.
 * @param next - The next middleware in the pipeline to call.
 * @returns The updated blueprint or a promise resolving to it.
 */
export const CommandMiddleware = ({ modules, blueprint }: ConfigContext, next: NextPipe<ConfigContext, IBlueprint>): IBlueprint | Promise<IBlueprint> => {
  (modules as ClassType[])
    .filter(module => hasMetadata(module, COMMAND_KEY))
    .forEach(module => {
      const options: CommandOptions = getMetadata(module, COMMAND_KEY, { name: '', args: [] })
      blueprint.add('stone.adapter.commands', [[module, options]])
    })

  return next({ modules, blueprint })
}
