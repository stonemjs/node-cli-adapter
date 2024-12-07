import { ErrorOptions, IntegrationError } from '@stone-js/core'

/**
 * Custom error for Node CLI adapter operations.
 */
export class NodeCliAdapterError extends IntegrationError {
  constructor (message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'NodeCliAdapterError'
  }

  get exitCode (): number {
    const cause = this.cause as { exitCode: number, statusCode: number }
    return cause?.exitCode ?? cause?.statusCode ?? 500
  }
}
