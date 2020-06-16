/**
 * Модель свойств меню
 */
export interface IReceiveMenuItemDataModel {
    /**
     * Иконка для меню из FontAwsom
     */
    FaIcon: string;

    /**
     * Текст меню
     */
    Caption: string;

    /**
     * Ссылка меню
     */
    Href: string;
}

/**
 * Модель элемента меню
 */
export interface IReceiveMenuDataModel {
    /**
     * Категория меню, используется для Cookies раскрытия/скрытия меню
     */
    CategoryKey: string;

    /**
     * Начальное меню
     */
    StartMenu: IReceiveMenuItemDataModel;

    /**
     * Подменю начального меню
     */
    Children: IReceiveMenuItemDataModel[];
}

/**
 * Модель получения NAV меню
 */
export interface IReceiveMenuResponseDataModel {
    /**
     * Меню на левой стороне
     */
    LeftSideMenu: IReceiveMenuDataModel[];

    /**
     * Меню на правой стороне
     */
    TopSideMenu: {
        /**
         * Меню баланса
         */
        BalanceMenu: IReceiveMenuDataModel,

        /**
         * Меню приветствия
         */
        GreetingsMenu: IReceiveMenuDataModel,

        /**
         * Меню выхода
         */
        ExitMenu: IReceiveMenuDataModel
    };
}

