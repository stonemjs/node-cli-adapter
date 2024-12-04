import ora from 'ora'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { CommandInput } from './CommandInput'
import { CommandOutput } from './CommandOutput'
import { NODE_CONSOLE_PLATFORM } from '../constants'
import { CommandOptions } from '../decorators/Command'
import { Container } from '@stone-js/service-container'
import { CommandBuilder, ICommand } from '../declarations'
import { NodeCliAdapterError } from '../errors/NodeCliAdapterError'
import { ClassType, EventHandlerFunction, IBlueprint, IncomingEvent, IProvider, OutgoingResponse } from '@stone-js/core'

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
export class CommandServiceProvider<W extends IncomingEvent = IncomingEvent, X extends OutgoingResponse = OutgoingResponse> implements IProvider {
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
   * Retrieves the list of registered command classes.
   *
   * @returns An array of command constructor functions.
   */
  private get commands (): Array<[ClassType | Function, CommandOptions]> {
    return this.blueprint.get<Array<[ClassType | Function, CommandOptions]>>('stone.adapter.commands', [])
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
      .registerAppCommands()
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
   * Registers application commands in the service container.
   */
  private registerAppCommands (): this {
    this
      .commands
      .map(([commandClass, options]) => ({ options, command: this.resolveCommand(commandClass) }))
      .forEach(({ options }) => this.registerCommand(options))

    return this
  }

  /**
   * Resolves a command instance from the container.
   *
   * @param commandClass - The command constructor function.
   * @returns The resolved command instance.
   */
  private resolveCommand (commandClass: ClassType | Function): ICommand<W, X> {
    let command: ICommand<W, X> | undefined

    if (typeof commandClass === 'function') {
      command = Object.prototype.hasOwnProperty.call(commandClass, 'prototype')
        ? this.container.resolve<ICommand<W, X>>(commandClass, true)
        : { handle: commandClass as unknown as EventHandlerFunction<W, X> }
    }

    if (command === undefined) {
      throw new NodeCliAdapterError(`Failed to resolve command: ${commandClass.name}`)
    }

    return command
  }

  /**
   * Registers a single command using its `registerCommand` method.
   *
   * @param command - The command instance to register.
   */
  private registerCommand (options: CommandOptions): this {
    const builder = this.blueprint.get<CommandBuilder>('stone.adapter.commandBuilder')

    if (builder === undefined) {
      throw new NodeCliAdapterError('Command builder is required by command service provider, set it in CLI blueprint `stone.adapter.commandBuilder`.')
    }

    builder
      .command([options.name].concat(options.args ?? []).join(' '), options.desc ?? '', {
        builder: options.options ?? {}
      })

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
