/**
 * allows to load data in forced mode
 */
interface IForceThunkParam {
    /**
     * when true, tries to load data from server, otherwise gets current data from the cache
     */
    force?: boolean;
}

export default IForceThunkParam;
