[**Node CLI Adapter Documentation v0.0.21**](../../../README.md)

***

[Node CLI Adapter Documentation](../../../modules.md) / [command/CommandOutput](../README.md) / CommandOutput

# Class: CommandOutput

Defined in: [src/command/CommandOutput.ts:18](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandOutput.ts#L18)

Class representing a CommandOutput Facade.
Provides utility methods for logging, colored outputs, spinners, and progress bars.

## Properties

### format

> `readonly` **format**: `ChalkInstance`

Defined in: [src/command/CommandOutput.ts:22](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandOutput.ts#L22)

A formatting library (e.g., `chalk`).

## Methods

### breakLine()

> **breakLine**(`value`): `this`

Defined in: [src/command/CommandOutput.ts:84](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandOutput.ts#L84)

Output a line break.

#### Parameters

##### value

`number`

The number of newlines to add.

#### Returns

`this`

The current instance for chaining.

***

### error()

> **error**(`value`, `color`): `this`

Defined in: [src/command/CommandOutput.ts:108](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandOutput.ts#L108)

Output error-colored text.

#### Parameters

##### value

`string`

The text to display.

##### color

`boolean` = `true`

Whether to color the text. Defaults to true.

#### Returns

`this`

The current instance for chaining.

***

### info()

> **info**(`value`, `color`): `this`

Defined in: [src/command/CommandOutput.ts:96](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandOutput.ts#L96)

Output info-colored text.

#### Parameters

##### value

`string`

The text to display.

##### color

`boolean` = `true`

Whether to color the text. Defaults to true.

#### Returns

`this`

The current instance for chaining.

***

### progressBar()

> **progressBar**(`tokens`, `options`): `ProgressBar`

Defined in: [src/command/CommandOutput.ts:164](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandOutput.ts#L164)

Create a progress bar.

#### Parameters

##### tokens

`string`

The template string for the progress bar.

##### options

`ProgressBarOptions`

Configuration options for the progress bar.

#### Returns

`ProgressBar`

A new ProgressBar instance.

***

### show()

> **show**(`value`): `this`

Defined in: [src/command/CommandOutput.ts:62](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandOutput.ts#L62)

Output uncolored text.

#### Parameters

##### value

`string`

The text to display.

#### Returns

`this`

The current instance for chaining.

***

### spin()

> **spin**(`value`): `Ora`

Defined in: [src/command/CommandOutput.ts:143](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandOutput.ts#L143)

Output a spinner.

#### Parameters

##### value

`string`

The spinner's initial message. Defaults to null.

#### Returns

`Ora`

The spinner instance started.

***

### spinner()

> **spinner**(`value`): `Ora`

Defined in: [src/command/CommandOutput.ts:153](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandOutput.ts#L153)

Creates a spinner instance.

#### Parameters

##### value

`string`

The spinner's initial message. Defaults to null.

#### Returns

`Ora`

The spinner instance.

***

### succeed()

> **succeed**(`value`, `color`): `this`

Defined in: [src/command/CommandOutput.ts:132](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandOutput.ts#L132)

Output success-colored text.

#### Parameters

##### value

`string`

The text to display.

##### color

`boolean` = `true`

Whether to color the text. Defaults to true.

#### Returns

`this`

The current instance for chaining.

***

### table()

> **table**(`value`): `this`

Defined in: [src/command/CommandOutput.ts:73](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandOutput.ts#L73)

Output a table.

#### Parameters

##### value

`unknown`

The value to display as a table.

#### Returns

`this`

The current instance for chaining.

***

### warn()

> **warn**(`value`, `color`): `this`

Defined in: [src/command/CommandOutput.ts:120](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandOutput.ts#L120)

Output warn-colored text.

#### Parameters

##### value

`string`

The text to display.

##### color

`boolean` = `true`

Whether to color the text. Defaults to true.

#### Returns

`this`

The current instance for chaining.

***

### create()

> `static` **create**(`options`): [`CommandOutput`](CommandOutput.md)

Defined in: [src/command/CommandOutput.ts:39](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandOutput.ts#L39)

Create a CommandOutput instance.

#### Parameters

##### options

[`CommandOutputOptions`](../interfaces/CommandOutputOptions.md)

The options for creating the CommandOutput instance.

#### Returns

[`CommandOutput`](CommandOutput.md)
