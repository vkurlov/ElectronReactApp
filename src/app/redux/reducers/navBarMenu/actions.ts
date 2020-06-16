import { createReducerActions } from 'core/redux/funcs';

/**
 * Название редюсера с которым будут связаны эти action
 */
const reducerStateName = 'NAV_BAR_MENU';

/**
 * Все доступные actions дле редюсера NavBarMenu
 */
export const NavLeftSideBarMenuActions = {
    /**
     * Набор action для получения NavBarMenu
     */
    receiveAll: createReducerActions(reducerStateName, 'RECEIVE_ALL'),

    /**
     * Набор action для изменения состояния NavBarMenu
     */
    changeMenuState: createReducerActions(reducerStateName, 'CHANGE_MENU_STATE'),
};
