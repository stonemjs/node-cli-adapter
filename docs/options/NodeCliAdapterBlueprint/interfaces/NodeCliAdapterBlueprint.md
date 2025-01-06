[**Node CLI Adapter Documentation v0.0.21**](../../../README.md)

***

[Node CLI Adapter Documentation](../../../modules.md) / [options/NodeCliAdapterBlueprint](../README.md) / NodeCliAdapterBlueprint

# Interface: NodeCliAdapterBlueprint

Defined in: [src/options/NodeCliAdapterBlueprint.ts:36](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/options/NodeCliAdapterBlueprint.ts#L36)

Blueprint interface for the Node Cli Adapter.

This interface extends `StoneBlueprint` and defines the structure of the
Node Cli adapter blueprint used in the Stone.js framework. It includes
a `stone` object with an array of `NodeCliAdapterConfig` items.

## Extends

- `StoneBlueprint`

## Indexable

\[`key`: `string`\]: `unknown`

## Properties

### stone

> **stone**: [`NodeCliAdapterAppConfig`](NodeCliAdapterAppConfig.md)

Defined in: [src/options/NodeCliAdapterBlueprint.ts:37](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/options/NodeCliAdapterBlueprint.ts#L37)

Application-level settings, including environment, middleware, logging, and service registration.

#### Overrides

`StoneBlueprint.stone`
