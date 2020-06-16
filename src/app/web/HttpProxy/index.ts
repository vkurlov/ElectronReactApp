import { CloudServicesProxy } from 'app/web/HttpProxy/CloudServicesProxy';
import { NavMenuProxy } from 'app/web/HttpProxy/NavMenuProxy';
import { IRequestSender } from 'core/requestSender/interfaces';

/**
 * Http прокси
 */
export class HttpProxy {
    /**
     * Хост на ЛК
     */
    private CP_HOST: string = process.env.REACT_APP_CP_HOST ?? '';

    /**
     * Отправитель запросов
     */
    private requestSender: IRequestSender;
    constructor(requestSender: IRequestSender) {
        this.requestSender = requestSender;
    }

    /**
     * Возвращат прокси объект работающий с CloudServices
     */
    public getCloudServicesProxy() {
        return new CloudServicesProxy(this.requestSender, this.CP_HOST);
    }

    /**
     * Возвращат прокси объект работающий с NAV меню
     */
    public getNavMenuProxy() {
        return new NavMenuProxy(this.requestSender, this.CP_HOST);
    }
}