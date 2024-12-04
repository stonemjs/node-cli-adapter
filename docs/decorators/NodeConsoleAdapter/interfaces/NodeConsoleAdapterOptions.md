[**Node CLI Adapter Documentation v0.0.0**](../../../README.md)

***

[Node CLI Adapter Documentation](../../../modules.md) / [decorators/NodeConsoleAdapter](../README.md) / NodeConsoleAdapterOptions

# Interface: NodeConsoleAdapterOptions

Configuration options for the `NodeConsoleAdapter` decorator.
These options extend the default Node Cli adapter configuration.

## Extends

- `Partial`\<[`NodeCliAdapterConfig`](../../../options/NodeCliAdapterBlueprint/interfaces/NodeCliAdapterConfig.md)\>

## Properties

### commandBuilder?

> `optional` **commandBuilder**: [`CommandBuilder`](../../../declarations/type-aliases/CommandBuilder.md)

#### Inherited from

`Partial.commandBuilder`

#### Defined in

[src/options/NodeCliAdapterBlueprint.ts:21](https://github.com/stonemjs/node-cli-adapter/blob/51fcc01bbd0eb589538cce80e62e720559e5481a/src/options/NodeCliAdapterBlueprint.ts#L21)

***

### commands?

> `optional` **commands**: `ClassType`[]

#### Inherited from

`Partial.commands`

#### Defined in

[src/options/NodeCliAdapterBlueprint.ts:20](https://github.com/stonemjs/node-cli-adapter/blob/51fcc01bbd0eb589538cce80e62e720559e5481a/src/options/NodeCliAdapterBlueprint.ts#L20)

***

### router?

> `optional` **router**: `ClassType`

#### Inherited from

`Partial.router`

#### Defined in

[src/options/NodeCliAdapterBlueprint.ts:19](https://github.com/stonemjs/node-cli-adapter/blob/51fcc01bbd0eb589538cce80e62e720559e5481a/src/options/NodeCliAdapterBlueprint.ts#L19)
