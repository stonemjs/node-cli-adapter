import { hideBin } from 'yargs/helpers'
import { argv, exit } from 'node:process'
import yargs, { BuilderCallback } from 'yargs'
// @ts-expect-error - This import is handled by @rollup/plugin-json
import { version } from '../package.json'
import { COMMAND_NOT_FOUND_CODE } from './constants'
import { CommandOptions } from './decorators/Command'
import { RawResponseWrapper } from './RawResponseWrapper'
import { NodeCliAdapterError } from './errors/NodeCliAdapterError'
import { NodeCliExecutionContext, NodeCliEvent, RawResponse, NodeCliAdapterContext } from './declarations'
import { Adapter, AdapterEventBuilder, AdapterOptions, ClassType, IncomingEvent, IncomingEventOptions, LifecycleEventHandler, OutgoingResponse, RawResponseOptions } from '@stone-js/core'

/**
 * Node Cli Adapter for Stone.js.
 *
 * The `NodeCliAdapter` provides seamless integration between Stone.js applications
 * and the Node Cli environment. It processes incoming events from Node Cli,
 * transforms them into `IncomingEvent` instances, and returns a `RawResponse`.
 *
 * This adapter ensures compatibility with Node Cli's execution model and
 * abstracts the event handling process for Stone.js developers.
 *
 * @template NodeCliEvent - The type of the raw event received from Node Cli.
 * @template RawResponse - The type of the response to send back to Node Cli.
 * @template NodeCliExecutionContext - The Node Cli execution context type.
 * @template IncomingEvent - The type of the processed incoming event.
 * @template IncomingEventOptions - Options used to create an incoming event.
 * @template OutgoingResponse - The type of the outgoing response after processing.
 * @template NodeCliAdapterContext - Context type specific to the adapter.
 *
 * @extends Adapter
 *
 * @example
 * ```typescript
 * import { NodeCliAdapter } from '@stone-js/node-cli-adapter';
 *
 * const adapter = NodeCliAdapter.create({...});
 *
 * const handler = await adapter.run();
 *
 * export { handler };
 * ```
 *
 * @see {@link https://stone-js.com/docs Stone.js Documentation}
 */
export class NodeCliAdapter extends Adapter<
NodeCliEvent,
RawResponse,
NodeCliExecutionContext,
IncomingEvent,
IncomingEventOptions,
OutgoingResponse,
NodeCliAdapterContext
> {
  /**
   * Creates an instance of the `NodeCliAdapter`.
   *
   * This factory method allows developers to instantiate the adapter with
   * the necessary configuration options, ensuring it is correctly set up for
   * Node Cli usage.
   *
   * @param options - The configuration options for the adapter, including
   *                  handler resolver, error handling, and other settings.
   * @returns A fully initialized `NodeCliAdapter` instance.
   */
  static create (options: AdapterOptions<IncomingEvent, OutgoingResponse>): NodeCliAdapter {
    return new this(options)
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
   * Executes the adapter and provides an Node Cli-compatible handler function.
   *
   * The `run` method processes events, manages context, and returns the appropriate response.
   *
   * @template ExecutionResultType - The type representing the Node Cli event handler function.
   * @returns A promise resolving to the Node Cli handler function.
   * @throws {NodeCliAdapterError} If used outside the Node Cli environment.
   */
  public async run<ExecutionResultType = RawResponse>(): Promise<ExecutionResultType> {
    await this.onInit()

    const executionContext = yargs(hideBin(argv)).help().version(version).scriptName('stone')
    const rawEvent = await this.registerAppCommands(executionContext).makeRawEvent(executionContext)
    const response = await this.eventListener(rawEvent, executionContext)

    response === COMMAND_NOT_FOUND_CODE && executionContext.showHelp()

    return exit(response)
  }

  /**
   * Initializes the adapter and validates its execution context.
   *
   * Ensures the adapter is running in an Node Cli environment. If not, it
   * throws an error to prevent misuse.
   *
   * @throws {NodeCliAdapterError} If executed outside an Node Cli context (e.g., browser).
   */
  protected async onInit (): Promise<void> {
    if (typeof window === 'object') {
      throw new NodeCliAdapterError(
        'This `NodeCliAdapter` must be used only in Node Cli context.'
      )
    }

    await super.onInit()
  }

  /**
   * Processes an incoming Node Cli event.
   *
   * This method transforms the raw Node Cli event into a Stone.js `IncomingEvent`,
   * processes it through the pipeline, and generates a `RawResponse` to send back.
   *
   * @param rawEvent - The raw Node Cli event to be processed.
   * @param executionContext - The Node Cli execution context for the event.
   * @returns A promise resolving to the processed `RawResponse`.
   */
  protected async eventListener (rawEvent: NodeCliEvent, executionContext: NodeCliExecutionContext): Promise<RawResponse> {
    const eventHandler = this.handlerResolver(this.blueprint) as LifecycleEventHandler<IncomingEvent, OutgoingResponse>

    await this.onPrepare(eventHandler)

    const incomingEventBuilder = AdapterEventBuilder.create<IncomingEventOptions, IncomingEvent>({
      resolver: (options) => IncomingEvent.create(options)
    })

    const rawResponseBuilder = AdapterEventBuilder.create<RawResponseOptions, RawResponseWrapper>({
      resolver: (options) => RawResponseWrapper.create(options)
    })

    const rawResponse: RawResponse = 0

    return await this.sendEventThroughDestination(eventHandler, {
      rawEvent,
      rawResponse,
      executionContext,
      rawResponseBuilder,
      incomingEventBuilder
    })
  }

  /**
   * Creates a raw event object from the parsed command line arguments.
   *
   * @param builder - The execution context that provides the parsed command line arguments.
   * @returns A promise that resolves to a `NodeCliEvent` object containing the parsed arguments.
   *
   * The returned object includes all parsed arguments except for `_` and `$0`, which are stored
   * separately in the `_extra` and `_script` properties, respectively.
   */
  private async makeRawEvent (builder: NodeCliExecutionContext): Promise<NodeCliEvent> {
    const argv = await builder.parse()
    const args = Object.fromEntries(Object.entries(argv).filter(([key]) => !['_', '$0'].includes(key)))
    return {
      ...args,
      _extra: argv._,
      _script: argv.$0
    }
  }

  /**
   * Registers application commands in the service container.
   */
  private registerAppCommands (builder: NodeCliExecutionContext): this {
    this
      .commands
      .map(([, options]) => options)
      .forEach((options) => this.registerCommand(options, builder))

    return this
  }

  /**
   * Registers a single command using its `registerCommand` method.
   *
   * @param command - The command instance to register.
   */
  private registerCommand (options: CommandOptions, builder: NodeCliExecutionContext): void {
    const cmd: string[] = [[options.name].concat(options.args ?? []).join(' ')].concat(options.alias ?? [])
    builder.command(cmd, options.desc ?? '', options.options as BuilderCallback<{}, {}>)
  }
}
