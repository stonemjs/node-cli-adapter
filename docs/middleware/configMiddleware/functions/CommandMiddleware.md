[**Node CLI Adapter Documentation v0.0.21**](../../../README.md)

***

[Node CLI Adapter Documentation](../../../modules.md) / [middleware/configMiddleware](../README.md) / CommandMiddleware

# Function: CommandMiddleware()

> **CommandMiddleware**(`configContext`, `next`): `IBlueprint` \| `Promise`\<`IBlueprint`\>

Defined in: [src/middleware/configMiddleware.ts:13](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/middleware/configMiddleware.ts#L13)

Middleware to process and register modules as command handlers.

## Parameters

### configContext

`ConfigContext`

The configuration context containing the modules and blueprint.

### next

`NextPipe`\<`ConfigContext`, `IBlueprint`\>

The next middleware in the pipeline to call.

## Returns

`IBlueprint` \| `Promise`\<`IBlueprint`\>

The updated blueprint or a promise resolving to it.
