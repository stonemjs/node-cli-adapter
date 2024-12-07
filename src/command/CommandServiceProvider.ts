import ora from 'ora'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { CommandInput } from './CommandInput'
import { CommandOutput } from './CommandOutput'
import { NODE_CONSOLE_PLATFORM } from '../constants'
import { Container } from '@stone-js/service-container'
import { ClassType, IBlueprint, IProvider } from '@stone-js/core'
import { NodeCliAdapterError } from '../errors/NodeCliAdapterError'

/**
 * CommandServiceProvider options.
 */
export interface CommandServiceProviderOptions {
  container: Container
  blueprint: IBlueprint
}

/**
 * Class representing a CommandServiceProvider.
 * Responsible for registering router and application commands.
 *
 * @author
 * Mr. Stone <evensstone@gmail.com>
 */
export class CommandServiceProvider implements IProvider {
  /**
   * Blueprint configuration used to retrieve app settings.
   */
  private readonly blueprint: IBlueprint

  /**
   * The service container that manages dependencies.
   */
  private readonly container: Container

  /**
   * Create a new instance of CommandServiceProvider.
   *
   * @param container - The container instance for dependency resolution.
   */
  constructor ({ container, blueprint }: CommandServiceProviderOptions) {
    if (container === undefined) { throw new NodeCliAdapterError('Container is required to create a CoreServiceProvider instance.') }
    if (blueprint === undefined) { throw new NodeCliAdapterError('Blueprint is required to create a CoreServiceProvider instance.') }

    this.container = container
    this.blueprint = blueprint
  }

  /**
   * Retrieves the router classes.
   *
   * @returns Command Router constructor functions.
   */
  private get router (): ClassType {
    return this.blueprint.get<ClassType>('stone.adapter.router')
  }

  /**
   * Determines if this provider should be skipped.
   * Useful for registering the provider based on platform.
   *
   * @returns True if the provider should be skipped; otherwise, false.
   */
  mustSkip (): boolean {
    return this.blueprint.get<string>('stone.adapter.platform') !== NODE_CONSOLE_PLATFORM
  }

  /**
   * Registers router components and application commands in the service container.
   */
  register (): void {
    this
      .registerRouter()
      .registerCommandUtils()
  }

  /**
   * Registers the router in the service container.
   */
  private registerRouter (): this {
    if (this.router !== undefined) {
      this
        .container
        .singletonIf(this.router, (container: Container) => Reflect.construct(this.router, [container]))
        .alias(this.router, 'router')
    }

    return this
  }

  /**
   * Registers command utilities in the service container.
   */
  private registerCommandUtils (): this {
    this.container.singleton(CommandInput, () => CommandInput.create({ prompt: inquirer.createPromptModule() })).alias(CommandInput, 'commandInput')
    this.container.singleton(CommandOutput, () => CommandOutput.create({ stdConsole: console, smartConsole: ora, format: chalk })).alias(CommandOutput, 'commandOutput')

    return this
  }
}
