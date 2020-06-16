import { NavBarMenuSideEnum } from 'app/redux/reducers/navBarMenu/enums';

/**
 * Параметры для изменения состояния меню
 */
export interface INavBarMenuChangeMenuStateDataModel {
    /**
     * Ключ для поиска меню, для которого менямсостояние
     */
    menuKey: string;

    /**
     * У какого NavBarMenu ищем меню по ключу menuKey
     */
    menuSide: NavBarMenuSideEnum;

    /**
     * Устанавливаем меню раскрытым если true
     */
    isExpanded?: boolean;

    /**
     * Устснавливаем как активное если true
     */
    isActive?: boolean;
}