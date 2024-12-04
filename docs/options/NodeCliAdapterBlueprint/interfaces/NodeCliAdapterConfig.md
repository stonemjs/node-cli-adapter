[**Node CLI Adapter Documentation v0.0.0**](../../../README.md)

***

[Node CLI Adapter Documentation](../../../modules.md) / [options/NodeCliAdapterBlueprint](../README.md) / NodeCliAdapterConfig

# Interface: NodeCliAdapterConfig

Configuration interface for the Node Cli Adapter.

Extends the `AdapterConfig` interface from the Stone.js framework and provides
customizable options specific to the Node Cli platform. This includes
alias, resolver, middleware, hooks, and various adapter state flags.

## Extends

- `AdapterConfig`

## Properties

### commandBuilder

> **commandBuilder**: [`CommandBuilder`](../../../declarations/type-aliases/CommandBuilder.md)

#### Defined in

[src/options/NodeCliAdapterBlueprint.ts:21](https://github.com/stonemjs/node-cli-adapter/blob/51fcc01bbd0eb589538cce80e62e720559e5481a/src/options/NodeCliAdapterBlueprint.ts#L21)

***

### commands

> **commands**: `ClassType`[]

#### Defined in

[src/options/NodeCliAdapterBlueprint.ts:20](https://github.com/stonemjs/node-cli-adapter/blob/51fcc01bbd0eb589538cce80e62e720559e5481a/src/options/NodeCliAdapterBlueprint.ts#L20)

***

### router?

> `optional` **router**: `ClassType`

#### Defined in

[src/options/NodeCliAdapterBlueprint.ts:19](https://github.com/stonemjs/node-cli-adapter/blob/51fcc01bbd0eb589538cce80e62e720559e5481a/src/options/NodeCliAdapterBlueprint.ts#L19)
