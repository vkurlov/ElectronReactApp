import { CloudServicesActions } from 'app/redux/reducers/administartion/cloudServices/actions';
import { CloudServicesProcessIdEnum } from 'app/redux/reducers/administartion/cloudServices/enums';
import { ISetSelectedActionFailedPayload, ISetSelectedActionSuccessPayload, TSetSelectedPartialReducerType } from 'app/redux/reducers/administartion/cloudServices/partial/setSelected/interfaces/reducerTypes';
import { reducerStateProcessFail, reducerStateProcessStart, reducerStateProcessSuccess } from 'core/redux/funcs';

/**
 * Редюсер для установки выбраной записи из справочника CloudService
 * @param state состояние редюсера
 * @param action действие над редюсером
 */export const setSelectedPartialReducer: TSetSelectedPartialReducerType = (state, action) => {
    const processId = CloudServicesProcessIdEnum.SET_SELECTED_CLOUD_SERVICE;
    const { setSelectedCloudService: { START_ACTION, SUCCESS_ACTION, FAILED_ACTION } } = CloudServicesActions;

    switch (action.type) {
        case START_ACTION: {
            return reducerStateProcessStart(state, processId);
        }

        case SUCCESS_ACTION: {
            const payload = action.payload as ISetSelectedActionSuccessPayload;

            return reducerStateProcessSuccess(state, processId, {
                selectedCloudService: payload.selectedCloudService
            });
        }

        case FAILED_ACTION: {
            const payload = action.payload as ISetSelectedActionFailedPayload;
            return reducerStateProcessFail(state, processId, payload.error);
        }

        default:
            return null;
    }
};