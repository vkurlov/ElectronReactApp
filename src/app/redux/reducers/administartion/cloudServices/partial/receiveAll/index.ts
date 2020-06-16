import { CloudServicesActions } from 'app/redux/reducers/administartion/cloudServices/actions';
import { CloudServicesProcessIdEnum } from 'app/redux/reducers/administartion/cloudServices/enums';
import { IReceiveAllActionFailedPayload, IReceiveAllActionSuccessPayload, TReceiveAllPartialReducerType } from 'app/redux/reducers/administartion/cloudServices/partial/receiveAll/interfaces/reducerTypes';
import { reducerStateProcessFail, reducerStateProcessStart, reducerStateProcessSuccess } from 'core/redux/funcs';

/**
 * Редюсер для получения записей из справочника CloudService
 * @param state состояние редюсера
 * @param action действие над редюсером
 */
export const receiveAllPartialReducer: TReceiveAllPartialReducerType = (state, action) => {
    const processId = CloudServicesProcessIdEnum.RECEIVE_ALL_SERVICES;
    const { receiveAll: { START_ACTION, SUCCESS_ACTION, FAILED_ACTION } } = CloudServicesActions;

    switch (action.type) {
        case START_ACTION: {
            return reducerStateProcessStart(state, processId);
        }

        case SUCCESS_ACTION: {
            const payload = action.payload as IReceiveAllActionSuccessPayload;

            return reducerStateProcessSuccess(state, processId, {
                cloudServices: [...payload.cloudServices],
                hasSuccessFor: {
                    cloudServicesReceived: true
                }
            });
        }

        case FAILED_ACTION: {
            const payload = action.payload as IReceiveAllActionFailedPayload;
            return reducerStateProcessFail(state, processId, payload.error);
        }

        default:
            return null;
    }
};