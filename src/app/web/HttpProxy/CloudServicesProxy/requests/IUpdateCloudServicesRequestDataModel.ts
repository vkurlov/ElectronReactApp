/**
 * Модель параметров для обновления записи CloudService
 */
export interface IUpdateCloudServicesRequestDataModel {
    /**
     * ID CloudService
     */
    cloudServiceId: string;

    /**
     * Новый JsonWebToken
     */
    jsonWebToken: string;
}