/**
 * Модель ответа при получении всез записей CloudServices
 */
export interface IGetAllCloudServicesResponseDataModel {
    /**
     * ID
     */
    Id: string;

    /**
     * ID2
     */
    CloudServiceId: string;

    /**
     * Наименование службы
     */
    ServiceCaption: string;

    /**
     * Токен для аутентификации службы
     */
    JsonWebToken: string;
}
