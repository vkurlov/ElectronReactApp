/**
 * Scope of a DI object
 */
export enum InjectScopeEnum {
    /**
     * DI object is a singleton object
     */
    SINGLETON,

    /**
     * DI object will create every time when requested
     */
    TRANSIENT
}

/**
 * IoC container
 * @template TYPES An object contains interface names
 */
export interface IIoCContainer<TYPES extends string> {
    /**
     * Register an interface as a DI object
     * @param scope The scope of the DI object
     * @param interfaceO The interface to register as an DI object
     * @param implementation A real object to resolve the {interfaceO}
     * @returns true when interfaceO registered, otherwise false
     */
    register: <T extends object>(scope: InjectScopeEnum, interfaceO: TYPES, implementation: (c: IIoCContainer<TYPES>, ...args: any) => T) => boolean;

    /**
     * Unregister an interface from IoC container
     * @param interfaceO The interface to unregister from DI container
     * @returns true when interfaceO unregistered, otherwise false
     */
    unregister: (interfaceO: TYPES) => boolean;

    /**
     * To resolve an interface from IoC container
     * @param interfaceO The interface to resolve
     * @template T the interface to cast resolved object
     * @returns T Resolved object casted to T interface
     */
    resolve: <T extends object>(interfaceO: TYPES, ...args: any) => T;

    /**
     * Check is an interface registered in IoC container
     * @param interfaceO The interface to check
     * @returns true when interfaceO is registered, otherwise false
     */
    isRegistered: (interfaceO: TYPES) => boolean;
}

/**
 * Contains private fields for IIoCContainer object
 * @template TYPES An object contains interface names
 */
export interface IIoCContainerPrivates<TYPES extends string> {
    /**
     * Contains registered DI object, where [key] is an interface name, [value] is a function to get object for the interface
     */
    registeredObjects: {
        [key: string]:
        {
            scope: InjectScopeEnum;
            implementation: ((c: IIoCContainer<TYPES>, ...args: any) => object)
        } | undefined;
    };
    /**
     * Contains singleton objects, where [key] is an interface name, [value] is a singleton object for the interface
     */
    singletonObjects: { [key: string]: object | undefined };
}
