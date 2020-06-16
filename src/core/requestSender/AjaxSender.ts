import { isDev } from 'app/helpers/devDetector';
import { IWebContentFormatterFactory } from '../contentFormatter/interfaces';
import { WebVerbEnum } from './enums';
import { IAjaxRequestParams, IAjaxSender, IRequestParams } from './interfaces';

export class AjaxSender implements IAjaxSender {

  public constructor(contentFormatterFactory: IWebContentFormatterFactory) {
    this.contentFormatterFactory = contentFormatterFactory;

    this.submitWithPayload = this.submitWithPayload.bind(this);
    this.submitWithoutPayload = this.submitWithoutPayload.bind(this);
    this.submit = this.submit.bind(this);
    this.getAjax = this.getAjax.bind(this);
    this.postAjax = this.postAjax.bind(this);
    this.deleteAjax = this.deleteAjax.bind(this);
    this.putAjax = this.putAjax.bind(this);
  }
  public static AuthenticationTypeKey = 'authentication-token-type';
  public static AuthenticationTokenKey = 'authentication-token';

  private contentFormatterFactory: IWebContentFormatterFactory;

  public getAuthenticationTokenType() {
    if (isDev()) {
      return process.env.REACT_APP_DEV_AUTH_TOKEN_TYPE;
    }

    return (
      window.sessionStorage.getItem(AjaxSender.AuthenticationTypeKey) ||
      window.localStorage.getItem(AjaxSender.AuthenticationTypeKey)
    );
  }

  public getAuthenticationToken() {
    if (isDev()) {
      return process.env.REACT_APP_DEV_AUTH_TOKEN;
    }

    return (
      window.sessionStorage.getItem(AjaxSender.AuthenticationTokenKey) ||
      window.localStorage.getItem(AjaxSender.AuthenticationTokenKey)
    );
  }

  private submitWithPayload = <TResponse>(method: WebVerbEnum, url: string, params?: IRequestParams<any>) => {
    const p: IAjaxRequestParams = {
      method,
      requestMode: params?.requestMode,
      requestCache: params?.requestCache,
      abortSignal: params?.abortSignal,
      contentType: params?.contentType,
      acceptContentType: params?.acceptContentType,
      headers: params?.headers,
      dataToSend: params?.dataToSend
    };

    return this.submit<TResponse>(url, p);
  };

  private submitWithoutPayload = <TResponse>(method: WebVerbEnum, url: string, params?: IRequestParams<any>) => {
    const p: IAjaxRequestParams = {
      method,
      requestMode: params?.requestMode,
      requestCache: params?.requestCache,
      abortSignal: params?.abortSignal,
      contentType: undefined,
      acceptContentType: params?.acceptContentType,
      headers: params?.headers,
      dataToSend: params?.dataToSend
    };

    let urlFull;
    if (params) {
      const data = params.dataToSend;
      if (data) {
        if (typeof data === 'object') {
          const urlArgs = Object.keys(data)
            .reduce((a: string[], k: string) => {
              a.push(k + '=' + encodeURIComponent(data[k]));
              return a;
            }, []).join('&');

          if (url.indexOf('?') === -1) {
            urlFull = `${url}?${urlArgs}`;
          } else {
            urlFull = `${url}&${urlArgs}`;
          }
        } else {
          urlFull = url;
        }
      } else {
        urlFull = url;
      }
    } else {
      urlFull = url;
    }

    return this.submit<TResponse>(urlFull, p);
  }
  public async submit<TResponse extends {}>(url: string, params: IAjaxRequestParams): Promise<TResponse> {
    const tokenType = this.getAuthenticationTokenType();
    const token = this.getAuthenticationToken();

    const headers: { [key: string]: string; } = params?.headers ?? {};

    if (params.acceptContentType) {
      headers.Accept = params.acceptContentType;
    }

    if (params.contentType) {
      headers['Content-Type'] = params.contentType;
    }

    // Informs about ajax request
    headers['X-Requested-With'] = 'XMLHttpRequest';

    if (tokenType && token) {
      headers.Authorization = `${tokenType} ${token}`;
    }

    let requestBody = null;

    if (params.dataToSend instanceof FormData) {
      requestBody = params.dataToSend;
    } else
      if (params.dataToSend && params.contentType) {
        const dataFormatter = this.contentFormatterFactory.getFormatter(
          params.contentType
        );

        if (!dataFormatter) {
          return Promise.reject(
            new Error(
              `Can not submit request with body content of type "${params.contentType}" because of parser was not found to convert content-object to string.`
            )
          );
        }

        requestBody = dataFormatter.convertToString(params.dataToSend);
      }

    return fetch(url, {
      headers,
      method: params.method,
      mode: params.requestMode,
      body: requestBody,
      cache: params.requestCache,
      signal: params.abortSignal,
    }).then<TResponse>(async response => {

      if (response.redirected) {
        const redirectUrl = new URL(response.url);
        const searchParams = redirectUrl.searchParams;
        if (searchParams.has('returnUrl')) {
          searchParams.set('returnUrl', window.location.href.replace(window.location.origin, ''));
        }
        redirectUrl.search = searchParams.toString();
        window.location.href = redirectUrl.toString();
      }

      if (response.status === 403) {
        return Promise.reject(new Error('Отказано в доступе.'));
      }

      let contentType = response.headers.get('content-type');
      if (contentType) {
        contentType = contentType.split(';')[0].trim();
      }
      if (params.acceptContentType) {
        if (
          !contentType ||
          params.acceptContentType.indexOf(contentType) === -1
        ) {
          return Promise.reject(
            new Error(
              `Response from "${url}" has unexpected "content-type", expected:"${params.acceptContentType}", actual: "${contentType}"`
            )
          );
        }
      }

      const responseText = await response.text();
      if (!responseText || !contentType) {
        return (undefined as unknown) as TResponse;
      }
      const responseDataFormatter = this.contentFormatterFactory.getFormatter(
        contentType
      );

      if (!responseDataFormatter) {
        return Promise.reject(
          new Error(
            `Can not find parser of type "${contentType}" to convert response to JSON.`
          )
        );
      }

      const result = responseDataFormatter.stringToJson<TResponse>(responseText);
      return result;
    });
  }

  public postAjax<TResponse>(url: string, params?: IRequestParams<any>) {
    return this.submitWithPayload<TResponse>(WebVerbEnum.POST, url, params);
  }

  public getAjax<TResponse>(url: string, params?: IRequestParams<any>) {
    return this.submitWithoutPayload<TResponse>(WebVerbEnum.GET, url, params);
  }

  public putAjax<TResponse>(url: string, params?: IRequestParams<any>) {
    return this.submitWithPayload<TResponse>(WebVerbEnum.PUT, url, params);
  }

  public deleteAjax<TResponse>(url: string, params?: IRequestParams<any>) {
    return this.submitWithoutPayload<TResponse>(WebVerbEnum.DELETE, url, params);
  }
}
