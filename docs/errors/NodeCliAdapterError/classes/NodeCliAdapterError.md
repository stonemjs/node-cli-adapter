[**Node CLI Adapter Documentation v0.0.0**](../../../README.md)

***

[Node CLI Adapter Documentation](../../../modules.md) / [errors/NodeCliAdapterError](../README.md) / NodeCliAdapterError

# Class: NodeCliAdapterError

Custom error for Node CLI adapter operations.

## Extends

- `IntegrationError`

## Constructors

### new NodeCliAdapterError()

> **new NodeCliAdapterError**(`message`, `options`?): [`NodeCliAdapterError`](NodeCliAdapterError.md)

#### Parameters

##### message

`string`

##### options?

`ErrorOptions`

#### Returns

[`NodeCliAdapterError`](NodeCliAdapterError.md)

#### Overrides

`IntegrationError.constructor`

#### Defined in

[src/errors/NodeCliAdapterError.ts:7](https://github.com/stonemjs/node-cli-adapter/blob/51fcc01bbd0eb589538cce80e62e720559e5481a/src/errors/NodeCliAdapterError.ts#L7)

## Accessors

### exitCode

#### Get Signature

> **get** **exitCode**(): `number`

##### Returns

`number`

#### Defined in

[src/errors/NodeCliAdapterError.ts:12](https://github.com/stonemjs/node-cli-adapter/blob/51fcc01bbd0eb589538cce80e62e720559e5481a/src/errors/NodeCliAdapterError.ts#L12)
