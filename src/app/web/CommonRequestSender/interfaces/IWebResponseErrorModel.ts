import { IEmptyWebResponseModel } from '.';

/**
 * Represents web response with an error
 */
export interface IWebResponseErrorModel extends IEmptyWebResponseModel {
  /**
   * Gets error message
   */
  readonly errorMessage: string;
  /**
   * Gets error code
   */
  readonly errorCode: string;
  /**
   * Gets additional errors
   */
  readonly errors: string[];
}
