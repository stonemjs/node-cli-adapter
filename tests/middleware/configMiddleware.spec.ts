import { Config } from '@stone-js/config'
import { ClassType, ConfigContext } from '@stone-js/core'
import { COMMAND_KEY } from '../../src/decorators/constants'
import { CommandMiddleware } from '../../src/middleware/configMiddleware'

// Mock dependencies
vi.mock('@stone-js/pipeline')
const mockNext = vi.fn()

// Utility functions
const createMockContext = (modules: unknown[]): ConfigContext => ({ modules, blueprint: Config.create() })
const createMockModule = (key: PropertyKey, metadata: Record<any, any>): ClassType => {
  /* eslint-disable-next-line @typescript-eslint/no-extraneous-class */
  class MyClass {
    static readonly app = {
      builder: {
        middleware: []
      }
    }

    static onInit (): void {}

    static async load (): Promise<unknown> {
      return await Promise.resolve({ stone: { name: 'Test Stone.js' } })
    }
  }
  MyClass[Symbol.metadata] = { [key]: metadata }
  return MyClass
}

describe('configMiddleware', () => {
  let mockModules: ClassType[]
  let mockContext: ConfigContext

  beforeEach(async () => {
    const mockModule: any = {}
    mockModules = [
      createMockModule(COMMAND_KEY, { name: 'test1', args: [] }),
      createMockModule(COMMAND_KEY, { name: 'test2', args: [] }),
      mockModule
    ]
    mockContext = createMockContext(mockModules)
    mockNext.mockResolvedValue(mockContext.blueprint)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('ServiceMiddleware', () => {
    it('should call next with updated blueprint', async () => {
      const result = await CommandMiddleware(mockContext, mockNext)

      expect(mockNext).toHaveBeenCalledWith({ modules: mockContext.modules, blueprint: mockContext.blueprint })
      expect(result).toBe(mockContext.blueprint)
      expect(mockContext.blueprint.get('stone.adapter.commands')).length(2)
      expect(mockContext.blueprint.get('stone.adapter.router')).toBeTruthy()
      expect(mockContext.blueprint.get<Function[]>('stone.adapter.commands.0', [])).length(2)
    })

    it('should call next with no router and commands', async () => {
      // @ts-expect-error - Ignore for testing purposes
      mockContext.modules = []
      const result = await CommandMiddleware(mockContext, mockNext)

      expect(mockNext).toHaveBeenCalledWith({ modules: mockContext.modules, blueprint: mockContext.blueprint })
      expect(result).toBe(mockContext.blueprint)
      expect(mockContext.blueprint.get('stone.adapter.commands', [])).length(0)
      expect(mockContext.blueprint.get('stone.adapter.router')).toBeFalsy()
    })
  })
})
