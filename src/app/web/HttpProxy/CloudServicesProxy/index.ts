import { IUpdateCloudServicesRequestDataModel } from 'app/web/HttpProxy/CloudServicesProxy/requests/IUpdateCloudServicesRequestDataModel';
import { IGenerateJwtForCloudService } from 'app/web/HttpProxy/CloudServicesProxy/responses/IGenerateJwtForCloudService';
import { IGetAllCloudServicesResponseDataModel } from 'app/web/HttpProxy/CloudServicesProxy/responses/IGetAllCloudServicesResponseDataModel';
import { RequestKindEnum, WebVerbEnum } from 'core/requestSender/enums';
import { IRequestSender } from 'core/requestSender/interfaces';

/**
 * Прокси работающий с CloudServices
 */
export class CloudServicesProxy {
    private host: string;
    private requestSender: IRequestSender;
    constructor(requestSender: IRequestSender, host: string) {
        this.requestSender = requestSender;
        this.host = host;
    }

    /**
     * Запрос на генерацию JsonWebToken для справочника CloudServices
     * @param requestKind Вид запроса
     * @param cloudServiceId id записи в справочнике CloudServices
     */
    public generateJsonWebTokenFor(requestKind: RequestKindEnum, cloudServiceId: string) {
        return this.requestSender.submitRequest<IGenerateJwtForCloudService>(
            WebVerbEnum.GET,
            `${this.host}/CloudService/GenerateJsonWebTokenForCloudService?cloudServiceId=${cloudServiceId}`,
            {
                requestKind
            }
        );
    }

    /**
     * Запрос на получение справочника CloudServices
     * @param requestKind Вид запроса
     */
    public getAll(requestKind: RequestKindEnum) {
        return this.requestSender.submitRequest<IGetAllCloudServicesResponseDataModel[]>(
            WebVerbEnum.GET,
            `${this.host}/CloudService/GetAllCloudServices`,
            {
                requestKind
            }
        );
    }

    /**
     * Запрос на обновление записи в справочнике CloudServices
     * @param requestKind Вид запроса
     * @param data новые данные для обновления
     */
    public update(requestKind: RequestKindEnum, data: IUpdateCloudServicesRequestDataModel) {
        return this.requestSender.submitRequest<boolean>(
            WebVerbEnum.POST,
            `${this.host}/CloudService/UpdateCloudService`,
            {
                requestKind,
                requestParams: {
                    contentType: 'Application/json',
                    dataToSend: {
                        CloudServiceId: data.cloudServiceId,
                        JsonWebToken: data.jsonWebToken
                    }
                }
            }
        );
    }
}