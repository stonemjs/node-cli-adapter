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
    serviceProvider.registerCommandUtils = vi.fn().mockReturnThis()

    serviceProvider.register()

    // @ts-expect-error - private method
    expect(serviceProvider.registerRouter).toHaveBeenCalled()
    // @ts-expect-error - private method
    expect(serviceProvider.registerCommandUtils).toHaveBeenCalled()
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
