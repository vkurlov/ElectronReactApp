/**
 * Модель ответа при генерации нового JsonWebToken
 */
export interface IGenerateJwtForCloudService {
    /**
     * Сгенерированный JsonWebToken
     */
    jsonWebToken: string;
}