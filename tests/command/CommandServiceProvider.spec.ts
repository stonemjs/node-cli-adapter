import { NODE_CONSOLE_PLATFORM } from '../../src/constants'
import { CommandInput } from '../../src/command/CommandInput'
import { CommandOutput } from '../../src/command/CommandOutput'
import { NodeCliAdapterError } from '../../src/errors/NodeCliAdapterError'
import { CommandServiceProvider, CommandServiceProviderOptions } from '../../src/command/CommandServiceProvider'

/* eslint-disable @typescript-eslint/no-extraneous-class */

describe('CommandServiceProvider', () => {
  let mockContainer: any
  let mockBlueprint: any
  let serviceProvider: CommandServiceProvider

  beforeEach(() => {
    mockBlueprint = {
      get: vi.fn()
    }

    mockContainer = {
      singletonIf: vi.fn().mockReturnThis(),
      alias: vi.fn().mockReturnThis(),
      singleton: vi.fn().mockReturnThis(),
      resolve: vi.fn()
    }

    const options: CommandServiceProviderOptions = {
      container: mockContainer,
      blueprint: mockBlueprint
    }

    serviceProvider = new CommandServiceProvider(options)
  })

  it('should create a CommandServiceProvider instance', () => {
    expect(serviceProvider).toBeInstanceOf(CommandServiceProvider)
  })

  it('should throw an error if container is undefined', () => {
    expect(
      // @ts-expect-error - Ignore for testing purposes
      () => new CommandServiceProvider({ container: undefined, blueprint: mockBlueprint })
    ).toThrow(NodeCliAdapterError)
  })

  it('should throw an error if blueprint is undefined', () => {
    expect(
      // @ts-expect-error - Ignore for testing purposes
      () => new CommandServiceProvider({ container: mockContainer, blueprint: undefined })
    ).toThrow(NodeCliAdapterError)
  })

  it('should call register', () => {
    // @ts-expect-error - private method
    serviceProvider.registerRouter = vi.fn().mockReturnThis()
    // @ts-expect-error - private method
    serviceProvider.registerAppCommands = vi.fn().mockReturnThis()
    // @ts-expect-error - private method
    serviceProvider.registerAppCommands = vi.fn().mockReturnThis()

    serviceProvider.register()

    // @ts-expect-error - private method
    expect(serviceProvider.registerRouter).toHaveBeenCalled()
    // @ts-expect-error - private method
    expect(serviceProvider.registerAppCommands).toHaveBeenCalled()
    // @ts-expect-error - private method
    expect(serviceProvider.registerAppCommands).toHaveBeenCalled()
  })

  it('should retrieve commands from the blueprint', () => {
    const mockCommands = [['MockCommand', { name: 'mock', args: [], desc: '' }]]
    mockBlueprint.get.mockReturnValue(mockCommands)

    const commands = (serviceProvider as any).commands

    expect(mockBlueprint.get).toHaveBeenCalledWith('stone.adapter.commands', [])
    expect(commands).toEqual(mockCommands)
  })

  it('should retrieve the router class from the blueprint', () => {
    const mockRouter = class MockRouter {}
    mockBlueprint.get.mockReturnValue(mockRouter)

    const router = (serviceProvider as any).router

    expect(mockBlueprint.get).toHaveBeenCalledWith('stone.adapter.router')
    expect(router).toBe(mockRouter)
  })

  it('should determine if the provider should be skipped', () => {
    mockBlueprint.get.mockReturnValueOnce(NODE_CONSOLE_PLATFORM)
    const result = serviceProvider.mustSkip()
    expect(result).toBe(false)

    mockBlueprint.get.mockReturnValueOnce('other_platform')
    const result2 = serviceProvider.mustSkip()
    expect(result2).toBe(true)
  })

  it('should register the router in the container', () => {
    const mockRouter = class MockRouter {}
    mockBlueprint.get.mockReturnValue(mockRouter)

    // @ts-expect-error - private method
    serviceProvider.registerRouter()

    expect(mockContainer.singletonIf).toHaveBeenCalledWith(
      mockRouter,
      expect.any(Function)
    )
    expect(mockContainer.alias).toHaveBeenCalledWith(mockRouter, 'router')
  })

  it('should not register the router if undefined', () => {
    mockBlueprint.get.mockReturnValue(undefined)

    // @ts-expect-error - private method
    serviceProvider.registerRouter()

    expect(mockContainer.singletonIf).not.toHaveBeenCalled()
    expect(mockContainer.alias).not.toHaveBeenCalled()
  })

  it('should register application commands', () => {
    const mockCommands = [['MockCommand', { name: 'mock', args: [], desc: '' }]]
    mockBlueprint.get.mockReturnValue(mockCommands)

    // @ts-expect-error - private method
    vi.spyOn(serviceProvider, 'resolveCommand').mockReturnValue({ handle: vi.fn() })
    // @ts-expect-error - private method
    const registerCommandSpy = vi.spyOn(serviceProvider, 'registerCommand').mockImplementation(() => {})

    // @ts-expect-error - private method
    serviceProvider.registerAppCommands()

    expect(registerCommandSpy).toHaveBeenCalledWith({ name: 'mock', args: [], desc: '' })
  })

  it('should resolve a command instance', () => {
    const mockCommandClass = class MockCommand {}
    const mockCommandInstance = { handle: vi.fn() }

    mockContainer.resolve.mockReturnValue(mockCommandInstance)

    // @ts-expect-error - private method
    const result = serviceProvider.resolveCommand(mockCommandClass)

    expect(mockContainer.resolve).toHaveBeenCalledWith(mockCommandClass, true)
    expect(result).toBe(mockCommandInstance)
  })

  it('should resolve a command instance', () => {
    const mockCommandFunction: Function = () => {}
    const mockCommandInstance = { handle: mockCommandFunction }

    // @ts-expect-error - private method
    const result = serviceProvider.resolveCommand(mockCommandFunction)

    expect(result).toEqual(mockCommandInstance)
  })

  it('should throw an error if command resolution fails', () => {
    const mockCommandClass = class MockCommand {}
    mockContainer.resolve.mockReturnValue(undefined)

    // @ts-expect-error - private method
    expect(() => serviceProvider.resolveCommand(mockCommandClass)).toThrow(
      NodeCliAdapterError
    )
  })

  it('should register a command using CommandBuilder', () => {
    const mockCommandOptions = { name: 'mock', args: [], desc: '', options: {} }
    const mockCommandBuilder = { command: vi.fn() }
    mockBlueprint.get.mockReturnValue(mockCommandBuilder)

    // @ts-expect-error - private method
    serviceProvider.registerCommand(mockCommandOptions)

    expect(mockCommandBuilder.command).toHaveBeenCalledWith(
      'mock',
      '',
      { builder: {} }
    )
  })

  it('should register a command using CommandBuilder with default values', () => {
    const mockCommandOptions = { name: 'mock' }
    const mockCommandBuilder = { command: vi.fn() }
    mockBlueprint.get.mockReturnValue(mockCommandBuilder)

    // @ts-expect-error - private method
    serviceProvider.registerCommand(mockCommandOptions)

    expect(mockCommandBuilder.command).toHaveBeenCalledWith(
      'mock',
      '',
      { builder: {} }
    )
  })

  it('should throw an error if CommandBuilder is missing', () => {
    mockBlueprint.get.mockReturnValue(undefined)

    // @ts-expect-error - private method
    expect(() => serviceProvider.registerCommand({ name: 'mock' } as any)).toThrow(
      NodeCliAdapterError
    )
  })

  it('should register command utilities', () => {
    // @ts-expect-error - private method
    serviceProvider.registerCommandUtils()

    expect(mockContainer.singleton).toHaveBeenCalledWith(
      CommandInput,
      expect.any(Function)
    )
    expect(mockContainer.alias).toHaveBeenCalledWith(CommandInput, 'commandInput')

    expect(mockContainer.singleton).toHaveBeenCalledWith(
      CommandOutput,
      expect.any(Function)
    )
    expect(mockContainer.alias).toHaveBeenCalledWith(CommandOutput, 'commandOutput')
  })
})
