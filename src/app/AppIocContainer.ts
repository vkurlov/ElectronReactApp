import { CommonRequestSender } from 'app/web/CommonRequestSender';
import { HttpProxy } from 'app/web/HttpProxy';
import { JSONFormatter, WebContentFormatterFactory } from 'core/contentFormatter';
import { IWebContentFormatterFactory } from 'core/contentFormatter/interfaces';
import { AjaxSender } from 'core/requestSender/AjaxSender';
import { IAjaxSender, IRequestSender } from 'core/requestSender/interfaces';
import initDIContainer, { InjectScopeEnum } from '../core/IoCContainer';

/**
 * Содержит названия типов зарегестрировнных объектов
 */
export enum RegisteredObjectsEnum {
    /**
     * Объект для отправки запросов
     */
    REQUEST_SENDER = 'REQUEST_SENDER',

    /**
     * Объект для отправки ajax http запросов
     */
    AJAX_SENDER = 'AJAX_SENDER',

    /**
     * Объект в котором содержаться форматеры перевода из http ответов в результат json
     */
    CONTENT_FORMATTER_FACTORY = 'CONTENT_FORMATTER_FACTORY',

    /**
     * Клиентский объект через который отправляются запросы на сервер
     */
    HTTP_PROXY = 'HTTP_PROXY'
}

const thisAppIocContainer = initDIContainer<RegisteredObjectsEnum>();

thisAppIocContainer.register(InjectScopeEnum.SINGLETON, RegisteredObjectsEnum.CONTENT_FORMATTER_FACTORY, (_) => {
    return new WebContentFormatterFactory([new JSONFormatter('Application/json'), new JSONFormatter('text/json')]);
});

thisAppIocContainer.register(InjectScopeEnum.SINGLETON, RegisteredObjectsEnum.AJAX_SENDER, (c) => {
    return new AjaxSender(c.resolve<IWebContentFormatterFactory>(RegisteredObjectsEnum.CONTENT_FORMATTER_FACTORY));
});

thisAppIocContainer.register(InjectScopeEnum.SINGLETON, RegisteredObjectsEnum.REQUEST_SENDER, (c) => {
    return new CommonRequestSender(c.resolve<IAjaxSender>(RegisteredObjectsEnum.AJAX_SENDER));
});

thisAppIocContainer.register(InjectScopeEnum.SINGLETON, RegisteredObjectsEnum.HTTP_PROXY, (c) => {
    return new HttpProxy(c.resolve<IRequestSender>(RegisteredObjectsEnum.REQUEST_SENDER));
});

export const AppIocContainer = {
    instance: thisAppIocContainer,
    getHttpProxy: () => thisAppIocContainer.resolve<HttpProxy>(RegisteredObjectsEnum.HTTP_PROXY)
};
