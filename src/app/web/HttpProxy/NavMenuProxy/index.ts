import { IReceiveMenuResponseDataModel } from 'app/web/HttpProxy/NavMenuProxy/responses/IReceiveMenuResponseDataModel';
import { RequestKindEnum, WebVerbEnum } from 'core/requestSender/enums';
import { IRequestSender } from 'core/requestSender/interfaces';

/**
 * Прокси работающий с NAV меню
 */
export class NavMenuProxy {
    private host: string;
    private requestSender: IRequestSender;
    constructor(requestSender: IRequestSender, host: string) {
        this.requestSender = requestSender;
        this.host = host;
    }

    /**
     * Запрос на получения NavBarMenu
     * @param requestKind Вид запроса
     */
    public receiveNavMenu(requestKind: RequestKindEnum): Promise<IReceiveMenuResponseDataModel> {
        return this.requestSender.submitRequest<IReceiveMenuResponseDataModel>(
            WebVerbEnum.GET,
            `${this.host}/Navigation/GetMenu`,
            {
                requestKind
            }
        );
    }
}