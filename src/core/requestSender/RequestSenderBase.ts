import { RequestKindEnum, WebVerbEnum } from './enums';
import { IAjaxSender, IFetchParams, IRequestParams, IRequestSender } from './interfaces';

/**
 * Represents web request sender
 */
export abstract class RequestSenderBase<TResponseObject> implements IRequestSender {
  private static hasRequestSentByUser = false;
  private static _maxAsynchronousRequestsSentByUser = 3;
  private static _reservedAsynchronousRequestsSentByUser = 0;

  private ajaxSender: IAjaxSender;
  constructor(ajaxSender: IAjaxSender) {
    this.ajaxSender = ajaxSender;
    this.ajaxSubmitMethods = {
      [WebVerbEnum.POST]: this.ajaxSender.postAjax,
      [WebVerbEnum.GET]: this.ajaxSender.getAjax,
      [WebVerbEnum.PUT]: this.ajaxSender.putAjax,
      [WebVerbEnum.DELETE]: this.ajaxSender.deleteAjax
    };
  }

  /**
   * Gets true when user can send request, otherwise false.
   */
  public static get canUserSendRequest(): boolean {
    return !RequestSenderBase.hasRequestSentByUser;
  }

  /**
   * Gets true when request has been sent by user, otherwise false.
   */
  public static get getHasRequestSentByUser(): boolean {
    return RequestSenderBase.hasRequestSentByUser;
  }

  /**
   * Gets true when user can send asynchronous request, otherwise false.
   */
  public static get canUserSendAsynchronousRequest(): boolean {
    return RequestSenderBase._maxAsynchronousRequestsSentByUser > 0 &&
      RequestSenderBase._reservedAsynchronousRequestsSentByUser < RequestSenderBase._maxAsynchronousRequestsSentByUser;
  }

  /**
   * Gets maximum number of asynchronous requests that can be send by user.
   * By default 3 asynchronous requests can be send.
   */
  public static get getMaxAsynchronousRequestsSentByUser(): number {
    return RequestSenderBase._maxAsynchronousRequestsSentByUser;
  }

  /**
   * Sets maximum number of asynchronous manual requests that can be send
   * @param value - Can be from 0 to 255.
   * When value is not a number or less then zero, the passed argument will be ignored and old value will not changed.
   * When value more 255 then 255 will be used.
   */
  public static set setMaxAsynchronousManualRequests(value: number) {
    if (!value || typeof (value) !== 'number' || value < 0) {
      return;
    }

    if (value > 255) {
      value = 255;
    }

    RequestSenderBase._maxAsynchronousRequestsSentByUser = value;
  }

  /**
   * Gets number of asynchronous requests in progress.
   */
  public static get getReservedAsynchronousRequestsSentByUser(): number {
    return RequestSenderBase._reservedAsynchronousRequestsSentByUser;
  }

  private ajaxSubmitMethods: {
    [key in keyof typeof WebVerbEnum]: (
      url: string,
      params?: IRequestParams<any>
    ) => Promise<any>;
  };

  private freeRequestsSentByUser(requestKind: RequestKindEnum) {

    switch (requestKind) {
      case RequestKindEnum.SEND_BY_USER: {
        RequestSenderBase.hasRequestSentByUser = false;
        break;
      }

      case RequestKindEnum.SEND_BY_USER_ASYNCHRONOUSLY: {
        if (RequestSenderBase._reservedAsynchronousRequestsSentByUser > 0) {
          RequestSenderBase._reservedAsynchronousRequestsSentByUser -= 1;
        }
        break;
      }
    }
  }

  protected abstract handleResponse<TResult>(result: TResponseObject): Promise<TResult>;
  private tryPrepareRequestSentByUser<TResult>(): Promise<TResult> | undefined {
    if (RequestSenderBase.hasRequestSentByUser) {
      return Promise.reject(new Error('User can send only one non asynchronous request.'));
    }

    RequestSenderBase.hasRequestSentByUser = true;
    return undefined;
  }

  private tryPrepareRequestSentByUserAsynchronously<TResult>(): Promise<TResult> | undefined {
    if (!RequestSenderBase._maxAsynchronousRequestsSentByUser) {
      return Promise.reject(new Error(`User can not send asynchronous requests.`));
    }
    if (RequestSenderBase._maxAsynchronousRequestsSentByUser === RequestSenderBase._reservedAsynchronousRequestsSentByUser) {
      return Promise.reject(new Error(`User can send only ${RequestSenderBase._maxAsynchronousRequestsSentByUser} asynchronous request(s).`));
    }

    RequestSenderBase._reservedAsynchronousRequestsSentByUser += 1;
    return undefined;
  }

  private tryPrepareRequestWhenSentByUser<TResult>(requestKind: RequestKindEnum): Promise<TResult> | undefined {
    switch (requestKind) {
      case RequestKindEnum.SEND_BY_USER: {
        const rejectedPromise = this.tryPrepareRequestSentByUser<TResult>();
        if (rejectedPromise) {
          return rejectedPromise;
        }
        break;
      }

      case RequestKindEnum.SEND_BY_USER_ASYNCHRONOUSLY: {
        const rejectedPromise = this.tryPrepareRequestSentByUserAsynchronously<TResult>();
        if (rejectedPromise) {
          return rejectedPromise;
        }
        break;
      }
    }

    return undefined;
  }

  public submitRequest<TResult>(method: WebVerbEnum, url: string, args: IFetchParams<any>): Promise<TResult> {
    const rejectedPromise = this.tryPrepareRequestWhenSentByUser<TResult>(args.requestKind);
    if (rejectedPromise) {
      return rejectedPromise;
    }

    return this.ajaxSubmitMethods[method](url, args.requestParams)
      .then(result => {
        return this.handleResponse<TResult>(result);
      })
      .finally(() => {
        this.freeRequestsSentByUser(args.requestKind);
      });
  }

  public submitFiles<TResult>(url: string, params: IFetchParams<File[]>): Promise<TResult> {
    const formData = new FormData();

    if (!params.requestParams || !params.requestParams.dataToSend) {
      return Promise.reject(new Error('Can not upload file{s}, no one file has been passed.'));
    }

    for (const file of params.requestParams.dataToSend) {
      formData.append('file', file, file.name);
    }

    const result = this.ajaxSubmitMethods[WebVerbEnum.POST](url, {
      ...params,
      dataToSend: formData
    });

    return result;
  }
}
