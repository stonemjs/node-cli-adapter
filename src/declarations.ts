import { Argv } from 'yargs'
import { AdapterContext, EventHandlerFunction, IncomingEvent, IncomingEventOptions, OutgoingResponse } from '@stone-js/core'

/**
 * Represents a generic raw response as a number.
 */
export type RawResponse = number

/**
 * Represents the Node Cli execution context as yargs.
 */
export type NodeCliExecutionContext = CommandBuilder

/**
 * Represents the CommandBuilder as yargs.
 */
export type CommandBuilder = Argv<{}>

export interface ICommand<W extends IncomingEvent = IncomingEvent, X extends OutgoingResponse = OutgoingResponse> {
  handle: EventHandlerFunction<W, X>
  match?: (event: IncomingEvent) => boolean
}

/**
 * Represents a generic Node Cli event as a key-value pair.
 */
export interface NodeCliEvent {
  [x: string]: unknown
  __script: string
  __extra: Array<string | number>
}

/**
 * Represents the context for the Node Cli Adapter.
 *
 * This interface extends `AdapterContext` and includes additional properties
 * specific to generic Node Cli events.
 */
export interface NodeCliAdapterContext extends AdapterContext<
NodeCliEvent,
RawResponse,
NodeCliExecutionContext,
IncomingEvent,
IncomingEventOptions,
OutgoingResponse
> {
  /**
   * The raw response associated with the current context.
   */
  rawResponse: RawResponse
}
