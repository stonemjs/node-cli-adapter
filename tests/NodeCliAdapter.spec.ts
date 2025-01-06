import yargs from 'yargs'
import { exit } from 'node:process'
import { hideBin } from 'yargs/helpers'
import { RawResponse } from '../src/declarations'
import { NodeCliAdapter } from '../src/NodeCliAdapter'
import { COMMAND_NOT_FOUND_CODE } from '../src/constants'
import { CommandOptions } from '../src/decorators/Command'
import { RawResponseWrapper } from '../src/RawResponseWrapper'
import { NodeCliAdapterError } from '../src/errors/NodeCliAdapterError'
import { AdapterEventBuilder, AdapterOptions, IncomingEvent, OutgoingResponse } from '@stone-js/core'

vi.mock('node:process')

const showHelpMock = vi.fn()

vi.mock('yargs', () => ({
  default: vi.fn(() => ({
    help: vi.fn().mockReturnThis(),
    version: vi.fn().mockReturnThis(),
    scriptName: vi.fn().mockReturnThis(),
    command: vi.fn().mockReturnThis(),
    showHelp: showHelpMock.mockReturnThis(),
    parse: vi.fn(() => ({ _: [], $0: 'script' }))
  }))
}))

vi.mock('../package.json', () => ({
  version: '1.0.0'
}))

describe('NodeCliAdapter', () => {
  let adapter: NodeCliAdapter
  let adapterOptions: AdapterOptions<IncomingEvent, OutgoingResponse>

  beforeEach(() => {
    adapterOptions = {
      hooks: {},
      blueprint: {
        get: vi.fn(() => [
          [vi.fn(), { name: 'test', desc: 'A test command', args: ['--test'], alias: [], options: {} }]
        ])
      },
      handlerResolver: vi.fn(),
      logger: {
        error: vi.fn()
      }
    } as any

    adapter = NodeCliAdapter.create(adapterOptions)
  })

  describe('create', () => {
    it('should create a new instance of NodeCliAdapter', () => {
      expect(adapter).toBeInstanceOf(NodeCliAdapter)
    })
  })

  describe('onInit', () => {
    it('should throw an error if executed in a browser environment', async () => {
      // Simulate browser environment
      Object.defineProperty(global, 'window', { value: {}, configurable: true })
      // @ts-expect-error - Ignore for testing purposes
      await expect(adapter.onInit()).rejects.toThrow(NodeCliAdapterError)
      // Clean up
      delete (global as any).window
    })

    it('should not throw an error in a Node.js environment', async () => {
      // @ts-expect-error - Ignore for testing purposes
      await expect(adapter.onInit()).resolves.not.toThrow()
    })
  })

  describe('run', () => {
    it('should initialize and execute the adapter', async () => {
      // @ts-expect-error - Accessing private method for testing purposes
      adapter.sendEventThroughDestination = vi.fn(() => 500)
      await adapter.run<RawResponse>()
      expect(yargs).toHaveBeenCalled()
      expect(exit).toHaveBeenCalledWith(500)
    })

    it('should show help if no command matches', async () => {
      // @ts-expect-error - Accessing private method for testing purposes
      adapter.sendEventThroughDestination = vi.fn(() => COMMAND_NOT_FOUND_CODE)
      await adapter.run<RawResponse>()
      expect(showHelpMock).toHaveBeenCalled()
    })
  })

  describe('makeRawEvent', () => {
    it('should create a raw event from parsed arguments', async () => {
      const builder = yargs(hideBin(process.argv))
      // @ts-expect-error - Ignore for testing purposes
      const rawEvent = await adapter.makeRawEvent(builder)
      expect(rawEvent).toEqual({
        _extra: [],
        _script: 'script'
      })
    })
  })

  describe('registerAppCommands', () => {
    it('should register commands in the CLI context', () => {
      const mockBuilder = {
        command: vi.fn()
      }
      const commands: Array<[Function, CommandOptions]> = [
        [vi.fn(), { name: 'test', desc: 'A test command', args: ['--test'], alias: [], options: {} }]
      ]
      // @ts-expect-error - Ignore for testing purposes
      vi.spyOn(adapter, 'commands', 'get').mockReturnValue(commands)

      // @ts-expect-error - Ignore for testing purposes
      adapter.registerAppCommands(mockBuilder as any)
      expect(mockBuilder.command).toHaveBeenCalledWith(
        ['test --test'],
        'A test command',
        {}
      )
    })
  })

  describe('eventListener', () => {
    it('should process the incoming event and return a response', async () => {
      IncomingEvent.create = vi.fn()
      RawResponseWrapper.create = vi.fn()
      AdapterEventBuilder.create = vi.fn((options) => options.resolver({}))
      // @ts-expect-error
      adapter.sendEventThroughDestination = vi.fn()

      const rawEvent = { _extra: [], _script: 'script' } as any
      const executionContext = yargs(hideBin(process.argv))
      // @ts-expect-error - Ignore for testing purposes
      const response = await adapter.eventListener(rawEvent, executionContext)
      expect(response).toBeUndefined() // Assuming default `RawResponse` of `0`

      expect(AdapterEventBuilder.create).toHaveBeenCalled()
      // @ts-expect-error
      expect(adapter.sendEventThroughDestination).toHaveBeenCalled()
      expect(RawResponseWrapper.create).toHaveBeenCalledWith(expect.anything())
    })
  })

  describe('registerCommand', () => {
    it('should register a single command using yargs', () => {
      const mockBuilder = {
        command: vi.fn()
      }
      const commandOptions: CommandOptions = {
        name: 'test',
        desc: 'Test command',
        args: ['<file>'],
        alias: ['t'],
        options: {}
      }

      // @ts-expect-error - Ignore for testing purposes
      adapter.registerCommand(commandOptions, mockBuilder as any)
      expect(mockBuilder.command).toHaveBeenCalledWith(
        ['test <file>', 't'],
        'Test command',
        {}
      )
    })

    it('should register a single command using yargs with empty values', () => {
      const mockBuilder = {
        command: vi.fn()
      }
      const commandOptions: CommandOptions = {
        name: 'test'
      }

      // @ts-expect-error - Ignore for testing purposes
      adapter.registerCommand(commandOptions, mockBuilder as any)
      expect(mockBuilder.command).toHaveBeenCalledWith(
        ['test'],
        '',
        undefined
      )
    })
  })
})
