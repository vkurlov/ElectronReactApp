import { IRequestParams } from '.';
import { WebVerbEnum } from '../enums';

/**
 * Represents ajax request parameters
 */
export interface IAjaxRequestParams extends IRequestParams<any> {
  /**
   * Gets or sets web verb, such as POST, GET, PUT, DELETE
   */
  method: WebVerbEnum;
}
