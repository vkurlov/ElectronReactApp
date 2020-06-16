
/**
 * Содержит возможные ID процесы для dispatch в Redux при работе с NavBarMenu
 */
export enum NavBarMenuProcessIdEnum {
    /**
     * Получить весь сисок меню для NavBarMenu
     */
    RECEIVE = 'RECEIVE',

    /**
     * Изменить состояние меню, такое как: раскрыто/закрыто, выбрано/Не выбрано
     */
    CHANGE_MENU_STATE = 'CHANGE_MENU_STATE'
}

/**
 * Содержит варианты расположения NavBarMenu
 */
export enum NavBarMenuSideEnum {
    /**
     * NavBarMenu рассположено слева
     */
    LeftSide,

    /**
     * NavBarMenu расположено сверху
     */
    TopSide
}