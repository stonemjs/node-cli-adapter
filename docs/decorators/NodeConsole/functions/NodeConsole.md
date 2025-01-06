[**Node CLI Adapter Documentation v0.0.21**](../../../README.md)

***

[Node CLI Adapter Documentation](../../../modules.md) / [decorators/NodeConsole](../README.md) / NodeConsole

# Function: NodeConsole()

> **NodeConsole**\<`T`\>(`options`): `ClassDecorator`

Defined in: [src/decorators/NodeConsole.ts:35](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/decorators/NodeConsole.ts#L35)

A Stone.js decorator that integrates the Node Cli Adapter with a class.

This decorator modifies the class to seamlessly enable Node Cli as the
execution environment for a Stone.js application. By applying this decorator,
the class is automatically configured with the necessary blueprint for Node Cli.

## Type Parameters

• **T** *extends* `ClassType` = `ClassType`

The type of the class being decorated. Defaults to `ClassType`.

## Parameters

### options

[`NodeConsoleOptions`](../interfaces/NodeConsoleOptions.md) = `{}`

Optional configuration to customize the Node Cli Adapter.

## Returns

`ClassDecorator`

A class decorator that applies the Node Cli adapter configuration.

## Example

```typescript
import { NodeConsole } from '@stone-js/node-cli-adapter';

@NodeConsole({
  alias: 'NodeConsole',
})
class App {
  // Your application logic here
}
```
