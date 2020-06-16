import { IFetchParams } from '.';
import { WebVerbEnum } from '../enums';

/**
 * Represents web request sender
 */
export interface IRequestSender {
  /**
   * Submits web request
   * @param method web method of the request
   * @param url a url where to send request
   * @param args parameters of the request
   * @template TResult Response type
   * @returns Promise of web response object
   */
  submitRequest: <TResult>(method: WebVerbEnum, url: string, args: IFetchParams<any>)
    => Promise<TResult>;

  submitFiles: <TResult>(url: string, params: IFetchParams<File[]>)
    => Promise<TResult>;
}
