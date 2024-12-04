import { NextPipe } from '@stone-js/pipeline'
import { COMMAND_KEY } from '../decorators/constants'
import { CommandOptions } from '../decorators/Command'
import { CommandRouter } from '../command/CommandRouter'
import { ConfigContext, IBlueprint, ClassType, hasMetadata, getMetadata } from '@stone-js/core'

/**
 * Middleware to process and register modules as command handlers.
 *
 * @param configContext - The configuration context containing the modules and blueprint.
 * @param next - The next middleware in the pipeline to call.
 * @returns The updated blueprint or a promise resolving to it.
 */
export const CommandMiddleware = ({ modules, blueprint }: ConfigContext, next: NextPipe<ConfigContext, IBlueprint>): IBlueprint | Promise<IBlueprint> => {
  const commands = (modules as ClassType[]).filter(module => typeof module === 'function' && hasMetadata(module, COMMAND_KEY))

  commands.forEach(module => {
    const options: CommandOptions = getMetadata(module, COMMAND_KEY, { name: '', args: [] })
    blueprint.set('stone.adapter.commands', [[module, options]].concat(blueprint.get('stone.adapter.commands', [])))
  })

  if (commands.length > 0 && !blueprint.has('stone.adapter.router')) {
    blueprint.add('stone.adapter.router', CommandRouter)
  }

  return next({ modules, blueprint })
}
