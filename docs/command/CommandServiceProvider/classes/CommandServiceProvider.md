[**Node CLI Adapter Documentation v0.0.0**](../../../README.md)

***

[Node CLI Adapter Documentation](../../../modules.md) / [command/CommandServiceProvider](../README.md) / CommandServiceProvider

# Class: CommandServiceProvider\<W, X\>

Class representing a CommandServiceProvider.
Responsible for registering router and application commands.

## Author

Mr. Stone <evensstone@gmail.com>

## Type Parameters

• **W** *extends* `IncomingEvent` = `IncomingEvent`

• **X** *extends* `OutgoingResponse` = `OutgoingResponse`

## Implements

- `IProvider`

## Constructors

### new CommandServiceProvider()

> **new CommandServiceProvider**\<`W`, `X`\>(`container`): [`CommandServiceProvider`](CommandServiceProvider.md)\<`W`, `X`\>

Create a new instance of CommandServiceProvider.

#### Parameters

##### container

[`CommandServiceProviderOptions`](../interfaces/CommandServiceProviderOptions.md)

The container instance for dependency resolution.

#### Returns

[`CommandServiceProvider`](CommandServiceProvider.md)\<`W`, `X`\>

#### Defined in

[src/command/CommandServiceProvider.ts:44](https://github.com/stonemjs/node-cli-adapter/blob/51fcc01bbd0eb589538cce80e62e720559e5481a/src/command/CommandServiceProvider.ts#L44)

## Methods

### mustSkip()

> **mustSkip**(): `boolean`

Determines if this provider should be skipped.
Useful for registering the provider based on platform.

#### Returns

`boolean`

True if the provider should be skipped; otherwise, false.

#### Implementation of

`IProvider.mustSkip`

#### Defined in

[src/command/CommandServiceProvider.ts:76](https://github.com/stonemjs/node-cli-adapter/blob/51fcc01bbd0eb589538cce80e62e720559e5481a/src/command/CommandServiceProvider.ts#L76)

***

### register()

> **register**(): `void`

Registers router components and application commands in the service container.

#### Returns

`void`

#### Implementation of

`IProvider.register`

#### Defined in

[src/command/CommandServiceProvider.ts:83](https://github.com/stonemjs/node-cli-adapter/blob/51fcc01bbd0eb589538cce80e62e720559e5481a/src/command/CommandServiceProvider.ts#L83)
