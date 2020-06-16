import { AppInitialReducerStateNames } from 'app/redux/interfaces';
import { cloudServicesReducer } from 'app/redux/reducers/administartion/cloudServices';
import { navBarMenuReducer } from 'app/redux/reducers/navBarMenu';
import { AsyncReducerRegistry } from 'core/redux';
import { createStore } from 'core/redux/funcs';
import { StoreEnhancer } from 'redux';

/**
 * Создаёт Redux хранилище для приложения
 * @param reducerRegistry регистратор для динамических редюсеров
 * @param enhancer middleware при создании хранилеща
 */
export function createGlobalReduxStore(reducerRegistry: AsyncReducerRegistry, enhancer: StoreEnhancer) {
    const appReduxStore = createStore<AppInitialReducerStateNames>({
        cloudServicesState: cloudServicesReducer,
        navBarMenuState: navBarMenuReducer
    }, reducerRegistry, enhancer);

    return appReduxStore;
}
