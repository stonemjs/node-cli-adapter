import inquirer from 'inquirer'
import { Answers, UnnamedDistinctQuestion } from 'inquirer/dist/commonjs/types'

/**
 * CommandInputOptions
 */
export interface CommandInputOptions {
  prompt: typeof inquirer['prompt']
}

/**
 * Class representing a CommandInput Facade.
 * Handles user interactions through prompts, such as questions, confirmations, and choices.
 */
export class CommandInput {
  /**
   * A reference to the `prompt` method from the `inquirer` library.
   * This property is used to prompt the user for input in the command line interface.
   */
  private readonly _prompt: typeof inquirer['prompt']

  /**
   * Create a CommandInput instance.
   *
   * @param options - The options for creating the CommandInput instance.
   */
  static create (options: CommandInputOptions): CommandInput {
    return new this(options)
  }

  /**
   * Create a CommandInput instance.
   *
   * @param options - The options for creating the CommandInput instance.
   */
  private constructor ({ prompt }: CommandInputOptions) {
    this._prompt = prompt
  }

  /**
   * Displays a questionnaire.
   *
   * @param questions - An array of question objects to be displayed.
   * @returns The response from the prompt.
   */
  questionnaire (questions: Array<UnnamedDistinctQuestion<Answers & object> & { name: string }>): ReturnType<typeof inquirer['prompt']> {
    return this._prompt(questions)
  }

  /**
   * Prompts the user with a single question.
   *
   * @param question - The question object to display.
   * @returns The user's response.
   */
  async prompt<T>(question: (UnnamedDistinctQuestion<Answers & object> & { name?: string })): Promise<T> {
    return (await this.questionnaire([{ ...question, name: 'value' }])).value as T
  }

  /**
   * Asks a basic question with an optional fallback.
   *
   * @param message - The message to display.
   * @param fallback - The fallback value if no response is provided.
   * @returns The user's response.
   */
  async ask (message: string, fallback?: string): Promise<string> {
    return await this.prompt<string>({ type: 'input', message, default: fallback })
  }

  /**
   * Asks a numeric question with an optional fallback.
   *
   * @param message - The message to display.
   * @param fallback - The fallback value if no response is provided.
   * @returns The user's response as a number.
   */
  async askNumber (message: string, fallback?: number): Promise<number> {
    return await this.prompt<number>({ type: 'number', message, default: fallback })
  }

  /**
   * Asks for a secret input (e.g., password).
   *
   * @param message - The message to display.
   * @returns The user's response as a string.
   */
  async secret (message: string): Promise<string> {
    return await this.prompt<string>({ type: 'password', message })
  }

  /**
   * Asks for a confirmation.
   *
   * @param message - The message to display.
   * @param fallback - The fallback value if no response is provided.
   * @returns The user's response as a boolean.
   */
  async confirm (message: string, fallback: boolean = false): Promise<boolean> {
    return await this.prompt<boolean>({ type: 'confirm', message, default: fallback })
  }

  /**
   * Asks the user to make a choice from a list.
   *
   * @param message - The message to display.
   * @param choices - The array of choices to present.
   * @param fallbackIndex - The default selected index if no response is provided.
   * @param multiple - Whether to allow multiple selections.
   * @returns The user's response.
   */
  async choice (
    message: string,
    choices: string[],
    fallbackIndex: number[] = [0],
    multiple: boolean = false
  ): Promise<string | string[]> {
    return await this.prompt<string | string[]>({
      type: multiple ? 'checkbox' : 'rawlist',
      choices,
      message,
      default: fallbackIndex
    })
  }

  /**
   * Opens an editor for the user to input text.
   *
   * @param message - The message to display.
   * @param fallback - The fallback value if no response is provided.
   * @returns The user's response as a string.
   */
  async editor (message: string, fallback?: string): Promise<string> {
    return await this.prompt<string>({ type: 'editor', message, default: fallback })
  }
}
