import { Argv } from 'yargs'
import { ICommand } from '../declarations'
import { CommandOptions } from '../decorators/Command'
import { Container } from '@stone-js/service-container'
import { NodeCliAdapterError } from '../errors/NodeCliAdapterError'
import { ClassType, EventHandlerFunction, IBlueprint, IncomingEvent, IRouter, OutgoingResponse } from '@stone-js/core'

/**
 * CommandRouter options.
 */
export interface CommandRouterOptions {
  container: Container
  blueprint: IBlueprint
}

/**
 * Class representing a CommandRouter.
 * Responsible for finding and dispatching commands based on incoming events.
 *
 * @author
 * Mr. Stone <evensstone@gmail.com>
 */
export class CommandRouter<W extends IncomingEvent = IncomingEvent, X extends OutgoingResponse = OutgoingResponse> implements IRouter<W, X> {
  /**
   * Blueprint configuration used to retrieve app settings.
   */
  private readonly blueprint: IBlueprint

  /**
   * The service container that manages dependencies.
   */
  private readonly container: Container

  /**
   * Create a new instance of CommandRouter.
   *
   * @param container - The container instance for dependency resolution.
   */
  constructor ({ blueprint, container }: CommandRouterOptions) {
    this.blueprint = blueprint
    this.container = container
  }

  /**
   * Retrieves the list of registered command classes.
   *
   * @returns An array of command constructor functions.
   */
  private get commands (): Array<[ClassType, CommandOptions]> {
    return this.blueprint.get<Array<[ClassType, CommandOptions]>>('stone.adapter.commands', [])
  }

  /**
   * Dispatches an event to the appropriate command.
   *
   * @param event - The incoming event to be dispatched.
   * @returns The result of the command execution.
   */
  async dispatch (event: W): Promise<X> {
    return await this.runCommand(event, this.findCommand(event))
  }

  /**
   * Finds a command that matches the given event.
   *
   * @param event - The incoming event to match against commands.
   * @returns The matching command, or undefined if no match is found.
   */
  findCommand (event: W): ICommand<W, X> | undefined {
    return this.commands
      .map(([commandClass, options]) => ({ options, command: this.resolveCommand(commandClass) }))
      .find(({ command, options }) => this.checkCommandMatch(command, event, options))?.command
  }

  /**
   * Runs the given command with the provided event.
   *
   * @param event - The event to handle.
   * @param command - The command to execute.
   * @returns The result of the command execution, or void if no command is found.
   */
  async runCommand (event: W, command?: ICommand<W, X>): Promise<X> {
    if (command === undefined) {
      this.showHelp()
      return OutgoingResponse.create({ content: '', statusCode: 1 }) as X
    } else if (typeof command.handle === 'function') {
      return await command.handle(event)
    } else {
      throw new NodeCliAdapterError('Command does not implement a "handle" method.')
    }
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
   * Checks if a command matches the given event.
   *
   * @param command - The command to check.
   * @param event - The event to match.
   * @returns True if the command matches; otherwise, false.
   */
  private checkCommandMatch (command: ICommand<W, X>, event: W, options: CommandOptions): boolean {
    if (typeof command.match === 'function') {
      return command.match(event)
    } else {
      return event.getMetadataValue('task') === options.name || options.alias?.includes(event.getMetadataValue('task') as string) === true
    }
  }

  /**
   * Displays help information when no command matches the event.
   */
  private showHelp (): void {
    if (this.container.has('builder')) {
      this.container.make<Argv<{}>>('builder')?.showHelp()
    } else {
      console.error('No help available.')
    }
  }
}
