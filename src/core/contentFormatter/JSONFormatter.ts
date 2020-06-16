import { IWebContentFormatter } from './interfaces';

/**
 * Represents JSON web content formatter
 */
export class JSONFormatter implements IWebContentFormatter {
  public contentType: string;

  constructor(contentType: string) {
    this.contentType = contentType.toLowerCase().trim();
  }

  public convertToString<T>(json: T): string {
    return JSON.stringify(json);
  }

  public stringToJson<T>(text: string): T {
    return JSON.parse(text) as T;
  }
}
