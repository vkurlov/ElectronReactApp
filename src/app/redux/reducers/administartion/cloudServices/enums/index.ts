/**
 * Содержит возможные ID процесы для dispatch в Redux при работе с справочником CloudService
 */
export enum CloudServicesProcessIdEnum {

    /**
     * ID процеса для получения всех записей справочника CloudService
     */
    RECEIVE_ALL_SERVICES = 'RECEIVE_ALL_SERVICES',

    /**
     * ID процеса для применения изменений выбранной записи из справочника CloudService
     */
    UPDATE_CLOUD_SERVICE = 'UPDATE_CLOUD_SERVICE',

    /**
     * ID процеса для установки выбранной записи из справочника CloudService
     */
    SET_SELECTED_CLOUD_SERVICE = 'SET_SELECTED_CLOUD_SERVICE'
}