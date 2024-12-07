import { IncomingEvent } from '@stone-js/core'
import { COMMAND_NOT_FOUND_CODE } from '../../src/constants'
import { NodeCliAdapterError } from '../../src/errors/NodeCliAdapterError'
import { CommandRouter, CommandRouterOptions } from '../../src/command/CommandRouter'

/* eslint-disable @typescript-eslint/no-extraneous-class */

describe('CommandRouter', () => {
  let mockBlueprint: any
  let mockContainer: any
  let commandRouter: CommandRouter

  beforeEach(() => {
    mockBlueprint = {
      get: vi.fn()
    }

    mockContainer = {
      resolve: vi.fn(),
      has: vi.fn(),
      make: vi.fn()
    }

    const options: CommandRouterOptions = {
      blueprint: mockBlueprint,
      container: mockContainer
    }

    commandRouter = new CommandRouter(options)
  })

  it('should create a CommandRouter instance', () => {
    expect(commandRouter).toBeInstanceOf(CommandRouter)
  })

  it('should retrieve commands from the blueprint', () => {
    const mockCommands = [['MockCommand', { name: 'mock', alias: ['m'] }]]
    mockBlueprint.get.mockReturnValue(mockCommands)

    // @ts-expect-error - private property
    const commands = commandRouter.commands

    expect(mockBlueprint.get).toHaveBeenCalledWith('stone.adapter.commands', [])
    expect(commands).toEqual(mockCommands)
  })

  it('should find a matching command', () => {
    const mockCommand = { match: vi.fn().mockReturnValue(true) }
    const mockCommands = [[class {}, { name: 'mock', alias: ['m'] }]]

    mockBlueprint.get.mockReturnValue(mockCommands)
    mockContainer.resolve.mockReturnValue(mockCommand)

    const event = { getMetadataValue: vi.fn() } as unknown as IncomingEvent

    const result = commandRouter.findCommand(event)

    expect(result).toBe(mockCommand)
    expect(mockCommand.match).toHaveBeenCalledWith(event)
  })

  it('should return the default command if no matching command is found', () => {
    const mockCommand = { match: vi.fn().mockReturnValue(false) }
    const mockCommands = [[() => {}, { name: 'mock', alias: ['m'] }]]

    mockBlueprint.get.mockReturnValue(mockCommands)
    mockContainer.resolve.mockReturnValue(mockCommand)

    const event = { getMetadataValue: vi.fn() } as unknown as IncomingEvent

    const result = commandRouter.findCommand(event)

    expect(result).toBeUndefined()
  })

  it('should return undefined if no matching command is found', () => {
    const mockCommand: Function = () => {}
    const mockCommands = [[mockCommand, { name: '*', alias: ['m'] }]]

    mockBlueprint.get.mockReturnValue(mockCommands)
    mockContainer.resolve.mockReturnValue(mockCommand)

    const event = { getMetadataValue: vi.fn() } as unknown as IncomingEvent

    const result = commandRouter.findCommand(event)

    expect(result).toEqual({ handle: mockCommand })
  })

  it('should dispatch the event', async () => {
    const mockCommand = {
      match: vi.fn().mockReturnValue(true),
      handle: vi.fn().mockResolvedValue('Success')
    }
    const mockCommands = [[class {}, { name: 'mock', alias: ['m'] }]]

    mockBlueprint.get.mockReturnValue(mockCommands)
    mockContainer.resolve.mockReturnValue(mockCommand)

    // @ts-expect-error - empty object for testing purposes
    const event: IncomingEvent = {}

    const result = await commandRouter.dispatch(event)

    expect(mockCommand.handle).toHaveBeenCalledWith(event)
    expect(result).toBe('Success')
  })

  it('should return 500 statusCode response if no matching command is found', async () => {
    // @ts-expect-error - empty object for testing purposes
    const event: IncomingEvent = {}

    const result = await commandRouter.runCommand(event, undefined)

    expect(result).toEqual(
      expect.objectContaining({ statusCode: COMMAND_NOT_FOUND_CODE })
    )
  })

  it('should throw an error if command has no handle method', async () => {
    const mockCommand = {}

    // @ts-expect-error - empty object for testing purposes
    const event: IncomingEvent = {}

    await expect(async () => await commandRouter.runCommand(event, mockCommand as any)).rejects.toThrow(
      NodeCliAdapterError
    )
  })

  it('should resolve a command instance from the container', () => {
    const mockCommandClass = class MockCommand {}
    const mockCommandInstance = { handle: vi.fn() }

    mockContainer.resolve.mockReturnValue(mockCommandInstance)

    const result = (commandRouter as any).resolveCommand(mockCommandClass)

    expect(mockContainer.resolve).toHaveBeenCalledWith(mockCommandClass, true)
    expect(result).toBe(mockCommandInstance)
  })

  it('should throw an error if command resolution fails', () => {
    const mockCommandClass = class MockCommand {}

    mockContainer.resolve.mockReturnValue(undefined)

    expect(() => (commandRouter as any).resolveCommand(mockCommandClass)).toThrow(
      NodeCliAdapterError
    )
  })

  it('should check if a command matches an event using match method', () => {
    const mockCommand = { match: vi.fn().mockReturnValue(true) }

    // @ts-expect-error - empty object for testing purposes
    const event: IncomingEvent = {}

    const options = { name: 'mock', alias: ['m'] }

    const result = (commandRouter as any).checkCommandMatch(mockCommand, event, options)

    expect(mockCommand.match).toHaveBeenCalledWith(event)
    expect(result).toBe(true)
  })

  it('should check if a command matches an event using metadata', () => {
    const mockCommand = {}
    const event = { getMetadataValue: vi.fn().mockReturnValue('mock') } as unknown as IncomingEvent
    const options = { name: 'mock', alias: ['m'] }

    const result = (commandRouter as any).checkCommandMatch(mockCommand as any, event, options)

    expect(event.getMetadataValue).toHaveBeenCalledWith('_task')
    expect(result).toBe(true)
  })
})
