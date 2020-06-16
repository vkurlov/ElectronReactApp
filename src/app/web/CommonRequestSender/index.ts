import { RequestSenderBase } from 'core/requestSender/RequestSenderBase';
import { IEmptyWebResponseModel, IWebResponseErrorModel, IWebResponseSuccessModel } from './interfaces';

/**
 * Represents web request sender
 */
export class CommonRequestSender extends RequestSenderBase<IEmptyWebResponseModel> {
  protected handleResponse<TResult>(result: IEmptyWebResponseModel): Promise<TResult> {
    if (result?.success ?? true) {
      return Promise.resolve<TResult>((result as IWebResponseSuccessModel<TResult>)?.data);
    }

    const responseError = result as IWebResponseErrorModel;
    const errMsgTxt = responseError?.errorMessage ?? 'An unknown error has occurred.';

    const fullErrorText = responseError.errors
      ? `${errMsgTxt}\n\n${responseError?.errors?.join('\n') ?? ''}`
      : errMsgTxt;

    return Promise.reject<TResult>(new Error(fullErrorText));
  }
}
