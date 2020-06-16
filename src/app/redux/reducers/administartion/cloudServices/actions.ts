import { createReducerActions } from 'core/redux/funcs';

/**
 * Название редюсера с которым будут связаны эти action
 */
const reducerStateName = 'CLOUD_SERVICES';

/**
 * Все доступные actions дле редюсера CloudServices
 */
export const CloudServicesActions = {
    /**
     * Набор action на получения записей из справочника CloudService
     */
    receiveAll: createReducerActions(reducerStateName, 'RECEIVE_ALL'),

    /**
     * Набор action для обновления записи в справочнике CloudService
     */
    updateCloudService: createReducerActions(reducerStateName, 'UPDATE_CLOUD_SERVICE'),

    /**
     * Набор action на установку выбранной записи из справочника CloudService
     */
    setSelectedCloudService: createReducerActions(reducerStateName, 'SET_SELECTED_CLOUD_SERVICE'),
};
