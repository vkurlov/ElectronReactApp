import { IWebContentFormatter } from '.';

/**
 * Represents factory of web content formatters
 */
export interface IWebContentFormatterFactory {
  /**
   * Registers a web content formatter
   */
  registerFormatter: (formatter: IWebContentFormatter) => boolean;

  /**
   * Unregisters a web content formatter
   */
  unregisterFormatter: (contentType: string) => boolean;

  /**
   * Returns a web content formatter for a specific ContentType
   */
  getFormatter: (contentType: string) => IWebContentFormatter | undefined;
}
