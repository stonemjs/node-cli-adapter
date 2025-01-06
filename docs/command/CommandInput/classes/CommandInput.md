[**Node CLI Adapter Documentation v0.0.21**](../../../README.md)

***

[Node CLI Adapter Documentation](../../../modules.md) / [command/CommandInput](../README.md) / CommandInput

# Class: CommandInput

Defined in: [src/command/CommandInput.ts:15](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandInput.ts#L15)

Class representing a CommandInput Facade.
Handles user interactions through prompts, such as questions, confirmations, and choices.

## Methods

### ask()

> **ask**(`message`, `fallback`?): `Promise`\<`string`\>

Defined in: [src/command/CommandInput.ts:67](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandInput.ts#L67)

Asks a basic question with an optional fallback.

#### Parameters

##### message

`string`

The message to display.

##### fallback?

`string`

The fallback value if no response is provided.

#### Returns

`Promise`\<`string`\>

The user's response.

***

### askNumber()

> **askNumber**(`message`, `fallback`?): `Promise`\<`number`\>

Defined in: [src/command/CommandInput.ts:78](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandInput.ts#L78)

Asks a numeric question with an optional fallback.

#### Parameters

##### message

`string`

The message to display.

##### fallback?

`number`

The fallback value if no response is provided.

#### Returns

`Promise`\<`number`\>

The user's response as a number.

***

### choice()

> **choice**(`message`, `choices`, `fallbackIndex`, `multiple`): `Promise`\<`string` \| `string`[]\>

Defined in: [src/command/CommandInput.ts:112](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandInput.ts#L112)

Asks the user to make a choice from a list.

#### Parameters

##### message

`string`

The message to display.

##### choices

`string`[]

The array of choices to present.

##### fallbackIndex

`number`[] = `...`

The default selected index if no response is provided.

##### multiple

`boolean` = `false`

Whether to allow multiple selections.

#### Returns

`Promise`\<`string` \| `string`[]\>

The user's response.

***

### confirm()

> **confirm**(`message`, `fallback`): `Promise`\<`boolean`\>

Defined in: [src/command/CommandInput.ts:99](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandInput.ts#L99)

Asks for a confirmation.

#### Parameters

##### message

`string`

The message to display.

##### fallback

`boolean` = `false`

The fallback value if no response is provided.

#### Returns

`Promise`\<`boolean`\>

The user's response as a boolean.

***

### editor()

> **editor**(`message`, `fallback`?): `Promise`\<`string`\>

Defined in: [src/command/CommandInput.ts:133](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandInput.ts#L133)

Opens an editor for the user to input text.

#### Parameters

##### message

`string`

The message to display.

##### fallback?

`string`

The fallback value if no response is provided.

#### Returns

`Promise`\<`string`\>

The user's response as a string.

***

### prompt()

> **prompt**\<`T`\>(`question`): `Promise`\<`T`\>

Defined in: [src/command/CommandInput.ts:56](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandInput.ts#L56)

Prompts the user with a single question.

#### Type Parameters

• **T**

#### Parameters

##### question

`UnnamedDistinctQuestion`\<`Answers` & `object`\> & `object`

The question object to display.

#### Returns

`Promise`\<`T`\>

The user's response.

***

### questionnaire()

> **questionnaire**(`questions`): `PromptReturnType`\<`Answers`\>

Defined in: [src/command/CommandInput.ts:46](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandInput.ts#L46)

Displays a questionnaire.

#### Parameters

##### questions

`UnnamedDistinctQuestion`\<`Answers` & `object`\> & `object`[]

An array of question objects to be displayed.

#### Returns

`PromptReturnType`\<`Answers`\>

The response from the prompt.

***

### secret()

> **secret**(`message`): `Promise`\<`string`\>

Defined in: [src/command/CommandInput.ts:88](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandInput.ts#L88)

Asks for a secret input (e.g., password).

#### Parameters

##### message

`string`

The message to display.

#### Returns

`Promise`\<`string`\>

The user's response as a string.

***

### create()

> `static` **create**(`options`): [`CommandInput`](CommandInput.md)

Defined in: [src/command/CommandInput.ts:27](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandInput.ts#L27)

Create a CommandInput instance.

#### Parameters

##### options

[`CommandInputOptions`](../interfaces/CommandInputOptions.md)

The options for creating the CommandInput instance.

#### Returns

[`CommandInput`](CommandInput.md)
