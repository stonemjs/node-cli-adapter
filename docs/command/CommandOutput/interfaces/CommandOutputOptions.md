[**Node CLI Adapter Documentation v0.0.21**](../../../README.md)

***

[Node CLI Adapter Documentation](../../../modules.md) / [command/CommandOutput](../README.md) / CommandOutputOptions

# Interface: CommandOutputOptions

Defined in: [src/command/CommandOutput.ts:8](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandOutput.ts#L8)

CommandOutputOptions

## Properties

### format

> **format**: `ChalkInstance`

Defined in: [src/command/CommandOutput.ts:10](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandOutput.ts#L10)

***

### smartConsole()

> **smartConsole**: (`options`?) => `Ora`

Defined in: [src/command/CommandOutput.ts:11](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandOutput.ts#L11)

Elegant terminal spinner.

#### Parameters

##### options?

If a string is provided, it is treated as a shortcut for `options.text`.

`string` | `Options`

#### Returns

`Ora`

#### Example

```
import ora from 'ora';

const spinner = ora('Loading unicorns').start();

setTimeout(() => {
	spinner.color = 'yellow';
	spinner.text = 'Loading rainbows';
}, 1000);
```

***

### stdConsole

> **stdConsole**: `Console`

Defined in: [src/command/CommandOutput.ts:9](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/command/CommandOutput.ts#L9)
