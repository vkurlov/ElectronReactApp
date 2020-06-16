import { NavLeftSideBarMenuActions } from 'app/redux/reducers/navBarMenu/actions';
import { NavBarMenuProcessIdEnum } from 'app/redux/reducers/navBarMenu/enums';
import { IChangeMenuStateActionFailedPayload, IChangeMenuStateActionSuccessPayload, TChangeMenuStatePartialReducerType } from 'app/redux/reducers/navBarMenu/partial/changeMenuState/interfaces/reducerTypes';
import { reducerStateProcessFail, reducerStateProcessStart, reducerStateProcessSuccess } from 'core/redux/funcs';

/**
 * Редюсер для обновления состояния NavBarMenu
 * @param state состояние редюсера
 * @param action действие над редюсером
 */
export const changeMenuStatePartialReducer: TChangeMenuStatePartialReducerType = (state, action) => {
    const processId = NavBarMenuProcessIdEnum.CHANGE_MENU_STATE;
    const { changeMenuState: { START_ACTION, SUCCESS_ACTION, FAILED_ACTION } } = NavLeftSideBarMenuActions;

    switch (action.type) {
        case START_ACTION: {
            return reducerStateProcessStart(state, processId);
        }

        case SUCCESS_ACTION: {
            const payload = action.payload as IChangeMenuStateActionSuccessPayload;

            const foundMenu = state.menu.leftSideMenu.filter(item => item.startMenu.key === payload.menuKey)[0];

            foundMenu.startMenu.isExpanded = payload.isExpanded ?? false;
            foundMenu.startMenu.isActive = payload.isActive ?? false;

            return reducerStateProcessSuccess(state, processId, {
                menu: { ...state.menu },
            });
        }

        case FAILED_ACTION: {
            const payload = action.payload as IChangeMenuStateActionFailedPayload;
            return reducerStateProcessFail(state, processId, payload.error);
        }

        default:
            return null;
    }
};