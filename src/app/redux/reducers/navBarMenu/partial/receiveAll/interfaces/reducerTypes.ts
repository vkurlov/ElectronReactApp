import { INavBarMenuReducerState } from 'app/redux/reducers/navBarMenu/interfaces';
import { INavBarMenuDataModel } from 'app/redux/reducers/navBarMenu/interfaces/dataModels';
import { IReducerActionFailedPayload, IReducerActionStartPayload, IReducerActionSuccessPayload } from 'core/redux/interfaces';
import { TPartialReducerObject } from 'core/redux/types';

/**
 * Action в редюсер при старте загрузке NavBarMenu
 */
export interface IReceiveAllActionStartPayload extends IReducerActionStartPayload {
}

/**
 * Action в редюсер при не успешной загрузке NavBarMenu
 */
export interface IReceiveAllActionFailedPayload extends IReducerActionFailedPayload {
}

/**
 * Action в редюсер при успешной загрузке NavBarmenu
 */
export interface IReceiveAllActionSuccessPayload extends IReducerActionSuccessPayload {
    menu: INavBarMenuDataModel;
}

/**
 * Все возможные Action при загрузке NavBarMenu
 */
export type TReceiveAllActionAnyPayload =
    | IReceiveAllActionStartPayload
    | IReceiveAllActionSuccessPayload
    | IReceiveAllActionFailedPayload;


/**
 * Тип редюсера для загрузке NavMenuBar
 */
export type TReceiveAllPartialReducerType = TPartialReducerObject<INavBarMenuReducerState, TReceiveAllActionAnyPayload>;
