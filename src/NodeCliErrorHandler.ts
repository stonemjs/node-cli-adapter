import { NodeCliEvent, NodeCliExecutionContext, RawResponse } from './declarations'
import { IntegrationError, AdapterErrorContext, IAdapterErrorHandler, ILogger } from '@stone-js/core'

/**
 * NodeCliErrorHandler options.
 */
export interface NodeCliErrorHandlerOptions {
  logger: ILogger
}

/**
 * Class representing an NodeCliErrorHandler.
 */
export class NodeCliErrorHandler implements IAdapterErrorHandler<NodeCliEvent, RawResponse, NodeCliExecutionContext> {
  private readonly logger: ILogger

  /**
   * Create an NodeCliErrorHandler.
   *
   * @param options - NodeCliErrorHandler options.
   */
  constructor ({ logger }: NodeCliErrorHandlerOptions) {
    if (logger === undefined) {
      throw new IntegrationError('Logger is required to create an NodeCliErrorHandler instance.')
    }

    this.logger = logger
  }

  /**
   * Handle an error.
   *
   * @param error - The error to handle.
   * @param context - The context of the adapter.
   * @returns The raw response.
   */
  public async handle (error: Error, context: AdapterErrorContext<NodeCliEvent, RawResponse, NodeCliExecutionContext>): Promise<RawResponse> {
    this.logger.error(error.message, { error })
    return await context.rawResponseBuilder.add('exitCode', 500).build().respond()
  }
}
