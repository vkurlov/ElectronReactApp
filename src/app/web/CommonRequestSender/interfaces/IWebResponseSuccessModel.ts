import { IEmptyWebResponseModel } from '.';

/**
 * Represents success web response
 */
export interface IWebResponseSuccessModel<TResult> extends IEmptyWebResponseModel {
  /**
   * Gets response data object
   */
  readonly data: TResult;
}
