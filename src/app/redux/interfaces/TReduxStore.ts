import { TStoreStateNamesEnum } from 'app/redux/enums';
import { ICloudServicesReducerState } from 'app/redux/reducers/administartion/cloudServices/interfaces';
import { INavBarMenuReducerState } from 'app/redux/reducers/navBarMenu/interfaces';
import { TReducerStateContainer } from 'core/redux/types';

/**
 * Тип, в котором определены значения возможных значений состояний Redux хранилища
 */
export type AppReduxStoreStateNames = keyof typeof TStoreStateNamesEnum;

/**
 * Тип, в котором определены значения возможных значений состояний Redux хранилища при инициализации, то есть статических редюсеров
 */
export type AppInitialReducerStateNames = AppReduxStoreStateNames;

/**
 * Тип, который содержит строго типизированый State в Redux с перечислением состояний редюсера
 */
export type AppReduxStoreState = TReducerStateContainer<AppInitialReducerStateNames> & {
    cloudServicesState: ICloudServicesReducerState,
    navBarMenuState: INavBarMenuReducerState
};
