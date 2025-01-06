[**Node CLI Adapter Documentation v0.0.21**](../../../README.md)

***

[Node CLI Adapter Documentation](../../../modules.md) / [decorators/Command](../README.md) / Command

# Function: Command()

> **Command**\<`T`\>(`options`): `ClassDecorator`

Defined in: [src/decorators/Command.ts:58](https://github.com/stonemjs/node-cli-adapter/blob/ef52e5bf0dd08467e3b24c3d05bfc766eee30472/src/decorators/Command.ts#L58)

Command decorator to mark a class as a command and automatically bind it to the container.

This decorator is useful for marking classes that should be treated as commands by the Stone.js framework,
making them easily injectable and manageable by the command container.

## Type Parameters

• **T** *extends* `ClassType` = `ClassType`

## Parameters

### options

`Partial`\<[`CommandOptions`](../interfaces/CommandOptions.md)\> = `{}`

The configuration options for the command, including singleton and alias settings.

## Returns

`ClassDecorator`

A decorator function to set metadata on the target class.

## Example

```typescript
@Command({ alias: 'MyCommand' })
class MyCommand {
  // Command class logic here.
}
```
