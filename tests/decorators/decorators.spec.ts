import { Mock } from 'vitest'
import { COMMAND_KEY } from '../../src/decorators/constants'
import { addBlueprint, setClassMetadata } from '@stone-js/core'
import { Command, CommandOptions } from '../../src/decorators/Command'
import { nodeCliAdapterBlueprint } from '../../src/options/NodeCliAdapterBlueprint'
import { NodeConsoleAdapter, NodeConsoleAdapterOptions } from '../../src/decorators/NodeConsoleAdapter'

/* eslint-disable @typescript-eslint/no-extraneous-class */

// Mock setClassMetadata
vi.mock('@stone-js/core')

describe('NodeConsoleAdapter', () => {
  it('should call setClassMetadata with correct parameters', () => {
    (addBlueprint as Mock).mockReturnValueOnce(() => {})
    const options: NodeConsoleAdapterOptions = nodeCliAdapterBlueprint.stone.adapters?.[0] ?? {}
    NodeConsoleAdapter(options)(class {}, {} as any)
    expect(addBlueprint).toHaveBeenCalled()
  })

  it('should call setClassMetadata with default options if none are provided', () => {
    vi.mocked(addBlueprint).mockImplementation(() => {})
    NodeConsoleAdapter()(class {}, {} as any)
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
