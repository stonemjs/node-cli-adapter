import { NODE_CONSOLE_PLATFORM } from '../../src/constants'
import { CommandInput } from '../../src/command/CommandInput'
import { CommandOutput } from '../../src/command/CommandOutput'
import { CommandRouter } from '../../src/command/CommandRouter'
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
      alias: vi.fn().mockReturnThis(),
      singletonIf: vi.fn().mockReturnThis(),
      singleton: vi.fn().mockReturnThis(),
      make: vi.fn()
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
    serviceProvider.registerCommandUtils = vi.fn().mockReturnThis()

    serviceProvider.register()

    // @ts-expect-error - private method
    expect(serviceProvider.registerRouter).toHaveBeenCalled()
    // @ts-expect-error - private method
    expect(serviceProvider.registerCommandUtils).toHaveBeenCalled()
  })

  it('should determine if the provider should be skipped', () => {
    mockBlueprint.get.mockReturnValueOnce(NODE_CONSOLE_PLATFORM)
    expect(serviceProvider.mustSkip()).toBe(false)

    mockBlueprint.get.mockReturnValueOnce('other_platform')
    expect(serviceProvider.mustSkip()).toBe(true)
  })

  it('should set the kernel router resolver to the blueprint', () => {
    mockBlueprint.set = vi.fn((_key: string, resolver: Function) => resolver(mockContainer))
    serviceProvider.onPrepare()
    expect(mockBlueprint.set).toHaveBeenCalledWith('stone.kernel.routerResolver', expect.any(Function))
  })

  it('should register the router in the container', () => {
    // @ts-expect-error - private method
    serviceProvider.registerRouter()

    expect(mockContainer.singletonIf).toHaveBeenCalledWith(
      CommandRouter,
      expect.any(Function)
    )
    expect(mockContainer.alias).toHaveBeenCalledWith(CommandRouter, 'commandRouter')
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
