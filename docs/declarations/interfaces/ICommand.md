[**Node CLI Adapter Documentation v0.0.21**](../../README.md)

***

[Node CLI Adapter Documentation](../../modules.md) / [declarations](../README.md) / ICommand

# Interface: ICommand\<W, X\>

Defined in: [src/declarations.ts:28](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/declarations.ts#L28)

Represents the CommandHandler function for the Node Cli Adapter.

## Type Parameters

• **W** *extends* `IncomingEvent` = `IncomingEvent`

• **X** *extends* `OutgoingResponse` = `OutgoingResponse`

## Properties

### handle

> **handle**: `EventHandlerFunction`\<`W`, `X`\>

Defined in: [src/declarations.ts:29](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/declarations.ts#L29)

***

### match()?

> `optional` **match**: (`event`) => `boolean`

Defined in: [src/declarations.ts:30](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/declarations.ts#L30)

#### Parameters

##### event

`IncomingEvent`

#### Returns

`boolean`
