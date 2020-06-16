import { ICloudServicesReducerState } from 'app/redux/reducers/administartion/cloudServices/interfaces';
import { receiveAllPartialReducer } from 'app/redux/reducers/administartion/cloudServices/partial/receiveAll';
import { setSelectedPartialReducer } from 'app/redux/reducers/administartion/cloudServices/partial/setSelected';
import { updateItemPartialReducer } from 'app/redux/reducers/administartion/cloudServices/partial/updateItem';
import { createReducer, initReducerState } from 'core/redux/funcs';

/**
 * Начальное состояние редюсера CloudServices
 */
const initialState = initReducerState<ICloudServicesReducerState>(
    'CloudServices',
    {
        cloudServices: [],
        selectedCloudService: null,
        hasSuccessFor: {
            cloudServicesReceived: false
        }
    }
);

/**
 * Объединённые части редюсера для всего состояния CloudService
 */
const partialReducers = [
    receiveAllPartialReducer,
    updateItemPartialReducer,
    setSelectedPartialReducer
];

/**
 * Редюсер CloudServices
 */
export const cloudServicesReducer = createReducer(initialState, partialReducers);
