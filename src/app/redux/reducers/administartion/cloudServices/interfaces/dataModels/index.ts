/**
 * Модель содержащая поля справочника CloudService
 */
export interface ICloudServiceItemDataModel {
    /**
     * ID
     */
    id: string;

    /**
     * ID2
     */
    cloudServiceId: string;

    /**
     * Название службы
     */
    serviceCaption: string;

    /**
     * Токен JWT для аутентификации
     */
    jsonWebToken: string;
}
