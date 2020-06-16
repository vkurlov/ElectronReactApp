import { IWebContentFormatter, IWebContentFormatterFactory } from './interfaces';

/**
 * Represents factory of web content formatters
 */
export class WebContentFormatterFactory implements IWebContentFormatterFactory {
  /**
   * Contains registered web content formatters
   */
  private formatters: {
    /**
     * Key is ContentType of web content
     */
    [key: string]: IWebContentFormatter | undefined;
  } = {};

  constructor(formatters?: IWebContentFormatter[]) {
    if (formatters) {
      for (const formatter of formatters) {
        this.registerFormatter(formatter);
      }
    }
  }

  public registerFormatter(formatter: IWebContentFormatter): boolean {
    if (this.formatters[formatter.contentType]) {
      (console.error || console.log)(
        `Content formatter with type-content (${formatter.contentType}) has already registered.`
      );
      return false;
    }
    this.formatters[formatter.contentType] = formatter;
    return true;
  }

  public unregisterFormatter(contentType: string): boolean {
    if (this.formatters[contentType]) {
      this.formatters[contentType] = undefined;
      return true;
    }
    return false;
  }

  public getFormatter(contentType: string) {
    const formatter = this.formatters[contentType.toLowerCase().trim()];
    return formatter;
  }
}

