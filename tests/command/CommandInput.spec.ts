import { Mock } from 'vitest'
import { CommandInput, CommandInputOptions } from '../../src/command/CommandInput'

describe('CommandInput', () => {
  let mockPrompt: Mock
  let commandInput: CommandInput

  beforeEach(() => {
    mockPrompt = vi.fn()
    const options: CommandInputOptions = { prompt: mockPrompt } as any
    commandInput = CommandInput.create(options)
  })

  it('should create a CommandInput instance', () => {
    expect(commandInput).toBeInstanceOf(CommandInput)
  })

  it('should display a questionnaire', async () => {
    const questions = [
      { type: 'input', name: 'testQuestion', message: 'Test?' }
    ]
    const mockAnswers = { testQuestion: 'response' };
    (mockPrompt as any).mockResolvedValue(mockAnswers)

    const result = await commandInput.questionnaire([{ type: 'input', name: 'testQuestion', message: 'Test?' }])

    expect(mockPrompt).toHaveBeenCalledWith(questions)
    expect(result).toEqual(mockAnswers)
  })

  it('should prompt a single question', async () => {
    const question = { type: 'input', message: 'Test question?' }
    const mockAnswers = { value: 'response' };
    (mockPrompt as any).mockResolvedValue(mockAnswers)

    const result = await commandInput.prompt<string>({ type: 'input', message: 'Test question?' })

    expect(mockPrompt).toHaveBeenCalledWith([{ ...question, name: 'value' }])
    expect(result).toBe('response')
  })

  it('should ask a basic question with a fallback', async () => {
    const mockAnswers = { value: 'response' };
    (mockPrompt as any).mockResolvedValue(mockAnswers)

    const result = await commandInput.ask('What is your name?', 'John')

    expect(mockPrompt).toHaveBeenCalledWith([
      { type: 'input', message: 'What is your name?', default: 'John', name: 'value' }
    ])
    expect(result).toBe('response')
  })

  it('should ask a numeric question with a fallback', async () => {
    const mockAnswers = { value: 42 };
    (mockPrompt as any).mockResolvedValue(mockAnswers)

    const result = await commandInput.askNumber('What is your age?', 25)

    expect(mockPrompt).toHaveBeenCalledWith([
      { type: 'number', message: 'What is your age?', default: 25, name: 'value' }
    ])
    expect(result).toBe(42)
  })

  it('should ask for a secret input', async () => {
    const mockAnswers = { value: 'secretPassword' };
    (mockPrompt as any).mockResolvedValue(mockAnswers)

    const result = await commandInput.secret('Enter your password')

    expect(mockPrompt).toHaveBeenCalledWith([
      { type: 'password', message: 'Enter your password', name: 'value' }
    ])
    expect(result).toBe('secretPassword')
  })

  it('should ask for confirmation', async () => {
    const mockAnswers = { value: true };
    (mockPrompt as any).mockResolvedValue(mockAnswers)

    const result = await commandInput.confirm('Do you agree?')

    expect(mockPrompt).toHaveBeenCalledWith([
      { type: 'confirm', message: 'Do you agree?', default: false, name: 'value' }
    ])
    expect(result).toBe(true)
  })

  it('should ask for a choice from a list', async () => {
    const mockAnswers = { value: 'Choice 1' };
    (mockPrompt as any).mockResolvedValue(mockAnswers)

    const result = await commandInput.choice('Choose one:', ['Choice 1', 'Choice 2'], 0)

    expect(mockPrompt).toHaveBeenCalledWith([
      { type: 'rawlist', choices: ['Choice 1', 'Choice 2'], message: 'Choose one:', default: 0, name: 'value' }
    ])
    expect(result).toBe('Choice 1')
  })

  it('should ask for multiple choices from a list', async () => {
    const mockAnswers = { value: ['Choice 1', 'Choice 2'] };
    (mockPrompt as any).mockResolvedValue(mockAnswers)

    const result = await commandInput.choice('Choose multiple:', ['Choice 1', 'Choice 2'], 0, true)

    expect(mockPrompt).toHaveBeenCalledWith([
      { type: 'checkbox', choices: ['Choice 1', 'Choice 2'], message: 'Choose multiple:', default: 0, name: 'value' }
    ])
    expect(result).toEqual(['Choice 1', 'Choice 2'])
  })

  it('should open an editor for input', async () => {
    const mockAnswers = { value: 'Editor content' };
    (mockPrompt as any).mockResolvedValue(mockAnswers)

    const result = await commandInput.editor('Write something:', 'Default content')

    expect(mockPrompt).toHaveBeenCalledWith([
      { type: 'editor', message: 'Write something:', default: 'Default content', name: 'value' }
    ])
    expect(result).toBe('Editor content')
  })
})
