import { COMMAND_KEY } from '../../src/decorators/constants'
import { addBlueprint, setClassMetadata } from '@stone-js/core'
import { Command, CommandOptions } from '../../src/decorators/Command'
import { NodeConsoleOptions, NodeConsole } from '../../src/decorators/NodeConsole'
import { nodeCliAdapterBlueprint } from '../../src/options/NodeCliAdapterBlueprint'

/* eslint-disable @typescript-eslint/no-extraneous-class */

// Mock setClassMetadata
vi.mock('@stone-js/core', async (importOriginal) => {
  const actual: any = await importOriginal()
  return {
    ...actual,
    addBlueprint: vi.fn(() => {}),
    setClassMetadata: vi.fn(() => {}),
    classDecoratorLegacyWrapper: (fn: Function) => {
      fn()
      return fn
    },
  }
})

describe('NodeConsole', () => {
  it('should call addBlueprint with correct parameters', () => {
    const options: NodeConsoleOptions = nodeCliAdapterBlueprint.stone.adapters?.[0] ?? {}
    NodeConsole(options)(class {})
    expect(addBlueprint).toHaveBeenCalled()
  })

  it('should call addBlueprint with default options if none are provided', () => {
    vi.mocked(addBlueprint).mockImplementation(() => {})
    NodeConsole()(class {})
    expect(addBlueprint).toHaveBeenCalled()
  })
})

describe('Command', () => {
  it('should call setClassMetadata with correct parameters', () => {
    const options: CommandOptions = { name: 'test', args: '<file>' }
    Command(options)
    expect(setClassMetadata).toHaveBeenCalledWith(COMMAND_KEY, options)
  })

  it('should call setClassMetadata with default options if none are provided', () => {
    Command()
    expect(setClassMetadata).toHaveBeenCalledWith(COMMAND_KEY, {})
  })
})
