[**Node CLI Adapter Documentation v0.0.21**](../../README.md)

***

[Node CLI Adapter Documentation](../../modules.md) / [declarations](../README.md) / NodeCliAdapterContext

# Interface: NodeCliAdapterContext

Defined in: [src/declarations.ts:48](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/declarations.ts#L48)

Represents the context for the Node Cli Adapter.

This interface extends `AdapterContext` and includes additional properties
specific to generic Node Cli events.

## Extends

- `AdapterContext`\<[`NodeCliEvent`](NodeCliEvent.md), [`RawResponse`](../type-aliases/RawResponse.md), [`NodeCliExecutionContext`](../type-aliases/NodeCliExecutionContext.md), `IncomingEvent`, `IncomingEventOptions`, `OutgoingResponse`\>

## Properties

### rawResponse

> **rawResponse**: `number`

Defined in: [src/declarations.ts:59](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/declarations.ts#L59)

The raw response associated with the current context.

#### Overrides

`AdapterContext.rawResponse`
