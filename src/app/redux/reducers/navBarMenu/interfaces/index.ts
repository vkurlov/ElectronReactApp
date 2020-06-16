import { NavBarMenuProcessIdEnum } from 'app/redux/reducers/navBarMenu/enums';
import { INavBarMenuDataModel } from 'app/redux/reducers/navBarMenu/interfaces/dataModels';
import { IReducerState } from 'core/redux/interfaces';

/**
 * Состояние редюсера для работы с NavBarMenu
 */
export interface INavBarMenuReducerState extends IReducerState<NavBarMenuProcessIdEnum> {
    /**
     * Всё меню NavBarMenu
     */
    menu: INavBarMenuDataModel;

    /**
     * содержит ярлыки для фиксации загрузок данных, была ли загрузка или ещё нет
     */
    hasSuccessFor: {
        /**
         * Если true, то меню уже было загружёно
         */
        menuReceived: boolean
    };
}