import { addBlueprint, ClassType } from '@stone-js/core'
import { nodeCliAdapterBlueprint, NodeCliAdapterConfig } from '../options/NodeCliAdapterBlueprint'

/**
 * Configuration options for the `NodeConsoleAdapter` decorator.
 * These options extend the default Node Cli adapter configuration.
 */
export interface NodeConsoleAdapterOptions extends Partial<NodeCliAdapterConfig> {}

/**
 * A Stone.js decorator that integrates the Node Cli Adapter with a class.
 *
 * This decorator modifies the class to seamlessly enable Node Cli as the
 * execution environment for a Stone.js application. By applying this decorator,
 * the class is automatically configured with the necessary blueprint for Node Cli.
 *
 * @template T - The type of the class being decorated. Defaults to `ClassType`.
 * @param options - Optional configuration to customize the Node Cli Adapter.
 *
 * @returns A class decorator that applies the Node Cli adapter configuration.
 *
 * @example
 * ```typescript
 * import { NodeConsoleAdapter } from '@stone-js/node-cli-adapter';
 *
 * @NodeConsoleAdapter({
 *   alias: 'NodeConsoleAdapter',
 * })
 * class App {
 *   // Your application logic here
 * }
 * ```
 */
export const NodeConsoleAdapter = <T extends ClassType = ClassType>(
  options: NodeConsoleAdapterOptions = {}
): ((target: T, context: ClassDecoratorContext<T>) => void) => {
  return (target: T, context: ClassDecoratorContext<T>) => {
    if (nodeCliAdapterBlueprint.stone?.adapters?.[0] !== undefined) {
      // Merge provided options with the default Node Cli adapter blueprint.
      nodeCliAdapterBlueprint.stone.adapters[0] = {
        ...nodeCliAdapterBlueprint.stone.adapters[0],
        ...options
      }
    }

    // Add the modified blueprint to the target class.
    addBlueprint(target, context, nodeCliAdapterBlueprint)
  }
}
