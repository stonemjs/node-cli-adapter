import { COMMAND_KEY } from '../../src/decorators/constants'
import { CommandMiddleware } from '../../src/middleware/configMiddleware'
import { ClassType, ConfigContext, MetadataSymbol, MetadataHolder, IBlueprint } from '@stone-js/core'

// Mock dependencies
const mockNext = vi.fn()

const mockBlueprint = {
  add: vi.fn().mockReturnThis(),
} as unknown as IBlueprint

// Utility functions
const createMockContext = (modules: unknown[]): ConfigContext => ({ modules, blueprint: mockBlueprint })
const createMockModule = (key: PropertyKey, metadata: Record<any, any>): ClassType => {
  /* eslint-disable-next-line @typescript-eslint/no-extraneous-class */
  const MyClass: ClassType & Partial<MetadataHolder> = class {}
  MyClass[MetadataSymbol] = { [key]: metadata }
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

  describe('CommandMiddleware', () => {
    it('should call next with updated blueprint', async () => {
      const result = await CommandMiddleware(mockContext, mockNext)

      expect(result).toBe(mockContext.blueprint)
      expect(mockContext.blueprint.add).toHaveBeenCalledWith('stone.adapter.commands', expect.any(Array))
      expect(mockNext).toHaveBeenCalledWith({ modules: mockContext.modules, blueprint: mockContext.blueprint })
    })

    it('should call next with no router and commands', async () => {
      // @ts-expect-error - Ignore for testing purposes
      mockContext.modules = []
      const result = await CommandMiddleware(mockContext, mockNext)

      expect(result).toBe(mockContext.blueprint)
      expect(mockContext.blueprint.add).not.toHaveBeenCalled()
      expect(mockNext).toHaveBeenCalledWith({ modules: mockContext.modules, blueprint: mockContext.blueprint })
    })
  })
})
