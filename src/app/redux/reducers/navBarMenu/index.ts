import { INavBarMenuReducerState } from 'app/redux/reducers/navBarMenu/interfaces';
import { changeMenuStatePartialReducer } from 'app/redux/reducers/navBarMenu/partial/changeMenuState';
import { receiveAllPartialReducer } from 'app/redux/reducers/navBarMenu/partial/receiveAll';
import { createReducer, initReducerState } from 'core/redux/funcs';

/**
 * Начальное состояние редюсера NavBarMenu
 */
const initialState = initReducerState<INavBarMenuReducerState>(
    'NavBarMenu',
    {
        menu: {
            leftSideMenu: [],
            topSideMenu: null
        },
        hasSuccessFor: {
            menuReceived: false
        }
    }
);

/**
 * Объединённые части редюсера для всего состояния NavBarMenu
 */
const partialReducers = [
    receiveAllPartialReducer,
    changeMenuStatePartialReducer
];

/**
 * Редюсер NavBarMenu
 */
export const navBarMenuReducer = createReducer(initialState, partialReducers);
