/**
 * Formatter to convert web content to JSON and back to string representation
 */
export interface IWebContentFormatter {
  /**
   * Gets or sets ContentType the formatter works with
   */
  contentType: string;

  /**
   * Converts JSON object to string
   */
  convertToString: <T>(json: T) => string;

  /**
   * Converts web content to JSON
   */
  stringToJson: <T>(text: string) => T;
}
