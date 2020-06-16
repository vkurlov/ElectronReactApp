import { INavBarMenuReducerState } from 'app/redux/reducers/navBarMenu/interfaces';
import { IReducerActionFailedPayload, IReducerActionStartPayload, IReducerActionSuccessPayload } from 'core/redux/interfaces';
import { TPartialReducerObject } from 'core/redux/types';

/**
 * Action в редюсер при старте выполнения изменения состояния NavBarmenu
 */
export interface IChangeMenuStateActionStartPayload extends IReducerActionStartPayload {
}

/**
 * Action в редюсер при не успешном выполнения изменений состояния NavBarmenu
 */
export interface IChangeMenuStateActionFailedPayload extends IReducerActionFailedPayload {
}

/**
 * Action в редюсер при успешном выполнения изменений состояния NavBarmenu
 */
export interface IChangeMenuStateActionSuccessPayload extends IReducerActionSuccessPayload {
    /**
     * Ключ меню, который изменил состояние
     */
    menuKey: string;

    /**
     * Если true, то NavBarMenu раскрыто
     */
    isExpanded?: boolean;
    /**
     * Если true, то NavBarMenu выбрано
     */
    isActive?: boolean;

}

/**
 * Все возможные Action при изменении состояния меню
 */
export type TChangeMenuStateActionAnyPayload =
    | IChangeMenuStateActionStartPayload
    | IChangeMenuStateActionSuccessPayload
    | IChangeMenuStateActionFailedPayload;


/**
 * Тип редюсера для изменения состояния меню
 */
export type TChangeMenuStatePartialReducerType = TPartialReducerObject<INavBarMenuReducerState, TChangeMenuStateActionAnyPayload>;
