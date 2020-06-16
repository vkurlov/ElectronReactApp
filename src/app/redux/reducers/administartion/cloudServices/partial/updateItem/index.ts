import { CloudServicesActions } from 'app/redux/reducers/administartion/cloudServices/actions';
import { CloudServicesProcessIdEnum } from 'app/redux/reducers/administartion/cloudServices/enums';
import { IUpdateItemActionFailedPayload, IUpdateItemActionSuccessPayload, TUpdateItemPartialReducerType } from 'app/redux/reducers/administartion/cloudServices/partial/updateItem/interfaces/reducerTypes';
import { reducerStateProcessFail, reducerStateProcessStart, reducerStateProcessSuccess } from 'core/redux/funcs';

/**
 * Редюсер для обновления записи из справочника CloudService
 * @param state состояние редюсера
 * @param action действие над редюсером
 */
export const updateItemPartialReducer: TUpdateItemPartialReducerType = (state, action) => {
    const processId = CloudServicesProcessIdEnum.UPDATE_CLOUD_SERVICE;
    const { updateCloudService: { START_ACTION, SUCCESS_ACTION, FAILED_ACTION } } = CloudServicesActions;

    switch (action.type) {
        case START_ACTION: {
            return reducerStateProcessStart(state, processId);
        }

        case SUCCESS_ACTION: {
            const payload = action.payload as IUpdateItemActionSuccessPayload;

            const found = state.cloudServices.filter((item) => item.id === payload.updatedItem.id);

            if (!found.length) {
                return reducerStateProcessFail(state, processId, new Error(`Обновляемый CloudService(${payload.updatedItem.id})`));
            }

            const all = state.cloudServices.filter((item) => item.id !== payload.updatedItem.id);

            return reducerStateProcessSuccess(state, processId, {
                cloudServices: [...all, found[0]]
            });
        }

        case FAILED_ACTION: {
            const payload = action.payload as IUpdateItemActionFailedPayload;
            return reducerStateProcessFail(state, processId, payload.error);
        }

        default:
            return null;
    }
};