/**
 * Represents web request parameters
 */
export interface IRequestParams<TDataToSend> {
  /**
   * Gets or sets request mode
   */
  requestMode?: RequestMode;

  /**
   * Gets or sets request cache
   */
  requestCache?: RequestCache;

  /**
   * Gets or sets abort signal to terminate the request
   */
  abortSignal?: AbortSignal;

  /**
   * Gets or sets custom request headers
   */
  headers?: {
    [key: string]: string;
  };

  /**
   * Gets or sets request ContentType of body
   */
  contentType?: string;

  /**
   * Gets or sets accept ContentType
   */
  acceptContentType?: string;

  /**
   * Gets or sets data object to send
   */
  dataToSend?: TDataToSend;
}
