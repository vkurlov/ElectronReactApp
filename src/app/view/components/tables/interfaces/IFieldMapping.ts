export interface IFieldInfo {
    caption: string;
    fieldWidth: string;
    hiddenWhenLgDown?: boolean;
    hiddenWhenLgUp?: boolean;
    hiddenWhenMdDown?: boolean;
    hiddenWhenMdUp?: boolean;
    hiddenWhenSmDown?: boolean;
    hiddenWhenSmUp?: boolean;
    hiddenWhenXlDown?: boolean;
    hiddenWhenXlUp?: boolean;
    hiddenWhenXsDown?: boolean;
    hiddenWhenXsUp?: boolean;
    hiddenOnlyFor?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'sm' | 'md' | 'lg';
}


/**
 * Represents mapping between dataset field value and field text
 */
export interface IFieldMapping {
    /**
     * dataSetFieldName - dataset field value, result is a field text
     */
    [dataSetFieldName: string]: IFieldInfo;
}