import { IRequestParams } from '.';
import { RequestKindEnum } from '../enums';

/**
 * Represents Ajax fetch parameters
 * @template TDataToSend type of data to send
 */
export interface IFetchParams<TDataToSend> {
  /**
   * Gets or sets type of the request
   */
  requestKind: RequestKindEnum;
  /**
   * Gets or sets request parameters
   */
  requestParams?: IRequestParams<TDataToSend>;
}
