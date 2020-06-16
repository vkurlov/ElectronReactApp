import { IRequestParams } from '.';

/**
 * Represents ajax request submitter
 */
export interface IAjaxSender {
  /**
   * Returns authentication token type
   */
  getAuthenticationTokenType: () => string | undefined | null;

  /**
   * Returns authorization token
   */
  getAuthenticationToken: () => string | undefined | null;

  /**
   * Submits POST request
   * @template TResponse type of response object
   * @param url a url where to send request
   * @param params request parameters
   * @returns Promise of response object
   */
  postAjax: <TResponse>(url: string, params?: IRequestParams<any>) => Promise<TResponse>;

  /**
   * Submits GET request
   * @template TResponse type of response object
   * @param url a url where to send request
   * @param params request parameters
   * @returns Promise of response object
   */
  getAjax: <TResponse>(url: string, params?: IRequestParams<any>) => Promise<TResponse>;

  /**
   * Submits PUT request
   * @template TResponse type of response object
   * @param url a url where to send request
   * @param params request parameters
   * @returns Promise of response object
   */
  putAjax: <TResponse>(url: string, params?: IRequestParams<any>) => Promise<TResponse>;

  /**
   * Submits DELETE request
   * @template TResponse type of response object
   * @param url a url where to send request
   * @param params request parameters
   * @returns Promise of response object
   */
  deleteAjax: <TResponse>(url: string, params?: IRequestParams<any>) => Promise<TResponse>;
}
