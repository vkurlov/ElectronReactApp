import { NavLeftSideBarMenuActions } from 'app/redux/reducers/navBarMenu/actions';
import { NavBarMenuProcessIdEnum } from 'app/redux/reducers/navBarMenu/enums';
import { IReceiveAllActionFailedPayload, IReceiveAllActionSuccessPayload, TReceiveAllPartialReducerType } from 'app/redux/reducers/navBarMenu/partial/receiveAll/interfaces/reducerTypes';
import { reducerStateProcessFail, reducerStateProcessStart, reducerStateProcessSuccess } from 'core/redux/funcs';

/**
 * Редюсер для получения NavBarMenu
 * @param state состояние редюсера
 * @param action действие над редюсером
 */export const receiveAllPartialReducer: TReceiveAllPartialReducerType = (state, action) => {
    const processId = NavBarMenuProcessIdEnum.RECEIVE;
    const { receiveAll: { START_ACTION, SUCCESS_ACTION, FAILED_ACTION } } = NavLeftSideBarMenuActions;

    switch (action.type) {
        case START_ACTION: {
            return reducerStateProcessStart(state, processId);
        }

        case SUCCESS_ACTION: {
            const payload = action.payload as IReceiveAllActionSuccessPayload;

            return reducerStateProcessSuccess(state, processId, {
                menu: payload.menu,
                hasSuccessFor: {
                    menuReceived: true
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