[**Node CLI Adapter Documentation v0.0.21**](../../../README.md)

***

[Node CLI Adapter Documentation](../../../modules.md) / [decorators/Command](../README.md) / CommandOptions

# Interface: CommandOptions

Defined in: [src/decorators/Command.ts:10](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/decorators/Command.ts#L10)

Command options.

Represents the configuration options for a CLI command.

## Properties

### alias?

> `optional` **alias**: `string` \| `string`[]

Defined in: [src/decorators/Command.ts:21](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/decorators/Command.ts#L21)

Alias or aliases for the command, used for identification or access.
Can be a single alias or an array of aliases.

***

### args?

> `optional` **args**: `string` \| `string`[]

Defined in: [src/decorators/Command.ts:27](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/decorators/Command.ts#L27)

The arguments required or accepted by the command.
Can be a single argument or an array of arguments.

***

### desc?

> `optional` **desc**: `string`

Defined in: [src/decorators/Command.ts:32](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/decorators/Command.ts#L32)

The description of the command.

***

### name

> **name**: `string`

Defined in: [src/decorators/Command.ts:15](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/decorators/Command.ts#L15)

The unique name of the command.

***

### options?

> `optional` **options**: `Partial`\<`CommandBuilder`\<\{\}\>\>

Defined in: [src/decorators/Command.ts:38](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/decorators/Command.ts#L38)

A map of additional options for the command, where the key is the option name
and the value is its description.
