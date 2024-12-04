[**Node CLI Adapter Documentation v0.0.0**](../../README.md)

***

[Node CLI Adapter Documentation](../../modules.md) / [declarations](../README.md) / ICommand

# Interface: ICommand\<W, X\>

## Type Parameters

• **W** *extends* `IncomingEvent` = `IncomingEvent`

• **X** *extends* `OutgoingResponse` = `OutgoingResponse`

## Properties

### handle

> **handle**: `EventHandlerFunction`\<`W`, `X`\>

#### Defined in

[src/declarations.ts:20](https://github.com/stonemjs/node-cli-adapter/blob/51fcc01bbd0eb589538cce80e62e720559e5481a/src/declarations.ts#L20)

***

### match()?

> `optional` **match**: (`event`) => `boolean`

#### Parameters

##### event

`IncomingEvent`

#### Returns

`boolean`

#### Defined in

[src/declarations.ts:21](https://github.com/stonemjs/node-cli-adapter/blob/51fcc01bbd0eb589538cce80e62e720559e5481a/src/declarations.ts#L21)
