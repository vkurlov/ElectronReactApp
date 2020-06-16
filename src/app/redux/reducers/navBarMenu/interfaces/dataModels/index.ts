/**
 * Поля для меню NavBar
 */
export interface INavBarMenuItemInfoDataModel {
    /**
     * Ключ для меню, должен быть уникальным
     */
    key: string;

    /**
     * Иконка для меня из Font Awesome
     */
    faIcon: string;

    /**
     * Текст меню
     */
    caption: string;

    /**
     * Ссылка меню
     */
    href: string;

    /**
     * Если true, то список раскрыт
     */
    isExpanded: boolean;

    /**
     * Если true, то считается активным
     */
    isActive: boolean;
}

/**
 * Модель элемента меню NavBarMenu
 */
export interface INavBarMenuItemDataModel {
    /**
     * Категория меню, по этому полю из cookies берутся значения, для синхронизации раскрытости меню
     */
    categoryKey: string;

    /**
     * Стартовое меню, у которого может быть под меню
     */
    startMenu: INavBarMenuItemInfoDataModel;

    /**
     * Под меню стартового меню
     */
    children: INavBarMenuItemInfoDataModel[];
}

/**
 * Модель NavBarMenu со всех сторон
 */
export interface INavBarMenuDataModel {
    /**
     * NavBarMenu с левой стороны
     */
    leftSideMenu: INavBarMenuItemDataModel[];
    /**
     * NavBarMenu с верхней стороны
     */
    topSideMenu: {
        /**
         * Меню о балансе
         */
        balanceMenu: INavBarMenuItemDataModel | null,

        /**
         * Меню приветствия
         */
        greetingsMenu: INavBarMenuItemDataModel | null,

        /**
         * Меню выхода
         */
        exitMenu: INavBarMenuItemDataModel
    } | null;
}