import { Argv } from 'yargs'
import { RawResponseWrapper } from './RawResponseWrapper'
import { AdapterContext, EventHandlerFunction, IAdapterEventBuilder, IncomingEvent, IncomingEventOptions, OutgoingResponse, RawResponseOptions } from '@stone-js/core'

/**
 * Represents a generic raw response as a number.
 */
export type RawResponse = number

/**
 * Represents the CommandBuilder as yargs.
 */
export type CommandBuilder = Argv<{}>

/**
 * Represents the Node Cli execution context as yargs.
 */
export type NodeCliExecutionContext = CommandBuilder

/**
 * Represents the response builder for the Node cli Adapter.
 */
export type NodeCliAdapterResponseBuilder = IAdapterEventBuilder<RawResponseOptions, RawResponseWrapper>

/**
 * Represents the CommandHandler function for the Node Cli Adapter.
 */
export interface ICommand<W extends IncomingEvent = IncomingEvent, X extends OutgoingResponse = OutgoingResponse> {
  handle: EventHandlerFunction<W, X>
  match?: (event: IncomingEvent) => boolean
}

/**
 * Represents a generic Node Cli event as a key-value pair.
 */
export interface NodeCliEvent {
  [x: string]: unknown
  _script: string
  _extra: Array<string | number>
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
