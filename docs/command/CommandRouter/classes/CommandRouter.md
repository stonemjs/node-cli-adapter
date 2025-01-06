[**Node CLI Adapter Documentation v0.0.21**](../../../README.md)

***

[Node CLI Adapter Documentation](../../../modules.md) / [command/CommandRouter](../README.md) / CommandRouter

# Class: CommandRouter\<W, X\>

Defined in: [src/command/CommandRouter.ts:23](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandRouter.ts#L23)

Class representing a CommandRouter.
Responsible for finding and dispatching commands based on incoming events.

## Author

Mr. Stone <evensstone@gmail.com>

## Type Parameters

• **W** *extends* `IncomingEvent` = `IncomingEvent`

• **X** *extends* `OutgoingResponse` = `OutgoingResponse`

## Implements

- `IRouter`\<`W`, `X`\>

## Constructors

### new CommandRouter()

> **new CommandRouter**\<`W`, `X`\>(`container`): [`CommandRouter`](CommandRouter.md)\<`W`, `X`\>

Defined in: [src/command/CommandRouter.ts:57](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandRouter.ts#L57)

Create a new instance of CommandRouter.

#### Parameters

##### container

[`CommandRouterOptions`](../interfaces/CommandRouterOptions.md)

The container instance for dependency resolution.

#### Returns

[`CommandRouter`](CommandRouter.md)\<`W`, `X`\>

## Methods

### dispatch()

> **dispatch**(`event`): `Promise`\<`X`\>

Defined in: [src/command/CommandRouter.ts:77](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandRouter.ts#L77)

Dispatches an event to the appropriate command.

#### Parameters

##### event

`W`

The incoming event to be dispatched.

#### Returns

`Promise`\<`X`\>

The result of the command execution.

#### Implementation of

`IRouter.dispatch`

***

### findCommand()

> **findCommand**(`event`): `undefined` \| [`ICommand`](../../../declarations/interfaces/ICommand.md)\<`W`, `X`\>

Defined in: [src/command/CommandRouter.ts:87](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandRouter.ts#L87)

Finds a command that matches the given event.

#### Parameters

##### event

`W`

The incoming event to match against commands.

#### Returns

`undefined` \| [`ICommand`](../../../declarations/interfaces/ICommand.md)\<`W`, `X`\>

The matching command, or undefined if no match is found.

***

### runCommand()

> **runCommand**(`event`, `command`?): `Promise`\<`X`\>

Defined in: [src/command/CommandRouter.ts:100](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandRouter.ts#L100)

Runs the given command with the provided event.

#### Parameters

##### event

`W`

The event to handle.

##### command?

[`ICommand`](../../../declarations/interfaces/ICommand.md)\<`W`, `X`\>

The command to execute.

#### Returns

`Promise`\<`X`\>

The result of the command execution, or void if no command is found.

***

### create()

> `static` **create**\<`W`, `X`\>(`options`): [`CommandRouter`](CommandRouter.md)\<`W`, `X`\>

Defined in: [src/command/CommandRouter.ts:45](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandRouter.ts#L45)

Creates a new instance of `CommandRouter`.

This static method initializes a `CommandRouter` with the specified options.

#### Type Parameters

• **W** *extends* `IncomingEvent` = `IncomingEvent`

The type of the incoming event (default: `IncomingEvent`).

• **X** *extends* `OutgoingResponse` = `OutgoingResponse`

The type of the outgoing response (default: `OutgoingResponse`).

#### Parameters

##### options

[`CommandRouterOptions`](../interfaces/CommandRouterOptions.md)

The configuration options for the `CommandRouter`.

#### Returns

[`CommandRouter`](CommandRouter.md)\<`W`, `X`\>

A new instance of `CommandRouter` configured with the provided options.
