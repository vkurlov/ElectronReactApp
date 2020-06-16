import { CloudServicesProcessIdEnum } from 'app/redux/reducers/administartion/cloudServices/enums';
import { ICloudServiceItemDataModel } from 'app/redux/reducers/administartion/cloudServices/interfaces/dataModels';
import { IReducerState } from 'core/redux/interfaces';

/**
 * Состояние редюсера для работы с справочником CloudService
 */
export interface ICloudServicesReducerState extends IReducerState<CloudServicesProcessIdEnum> {

    /**
     * Массив записей из справочника CloudService
     */
    cloudServices: ICloudServiceItemDataModel[];

    /**
     * Выбранная запись из массива записей
     */
    selectedCloudService: ICloudServiceItemDataModel | null;

    /**
     * содержит ярлыки для фиксации загрузок данных, была ли загрузка или ещё нет
     */
    hasSuccessFor: {
        /**
         * Если true, то справочник CloudService уже был загружён
         */
        cloudServicesReceived: boolean
    };
}