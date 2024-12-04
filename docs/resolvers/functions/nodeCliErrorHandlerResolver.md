[**Node CLI Adapter Documentation v0.0.0**](../../README.md)

***

[Node CLI Adapter Documentation](../../modules.md) / [resolvers](../README.md) / nodeCliErrorHandlerResolver

# Function: nodeCliErrorHandlerResolver()

> **nodeCliErrorHandlerResolver**(`blueprint`): `IErrorHandler`\<`number`, `RuntimeError`\>

Error handler resolver for generic Node Cli adapter.

Creates and configures an `ErrorHandler` for managing errors in the generic Node Cli adapter.

## Parameters

### blueprint

`IBlueprint`\<`any`\>

The `IBlueprint` providing configuration and dependencies.

## Returns

`IErrorHandler`\<`number`, `RuntimeError`\>

An `ErrorHandler` instance for handling Node Cli errors.

## Defined in

[src/resolvers.ts:33](https://github.com/stonemjs/node-cli-adapter/blob/51fcc01bbd0eb589538cce80e62e720559e5481a/src/resolvers.ts#L33)
