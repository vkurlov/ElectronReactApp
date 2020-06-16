import { IIoCContainer, IIoCContainerPrivates, InjectScopeEnum } from './types';

const IoCContainerClass = (() => {
    const privateMembers = new WeakMap<object, IIoCContainerPrivates<string>>();

    class PrivateFieldsContainer<TYPES extends string> implements IIoCContainerPrivates<TYPES> {

        constructor() {
            this.registeredObjectsField = {};
            this.singletonObjectsField = {};
        }

        public get registeredObjects() {
            return this.registeredObjectsField;
        }

        public get singletonObjects() {
            return this.singletonObjectsField;
        }

        private registeredObjectsField: {
            [key: string]:
            {
                scope: InjectScopeEnum;
                implementation: ((c: IIoCContainer<TYPES>, ...args: any) => object)
            } | undefined;
        };

        private singletonObjectsField: { [key: string]: object | undefined };

        public static get<TYPES extends string>(iocContainer: IIoCContainer<TYPES>) {
            return privateMembers.get(iocContainer)!;
        }
    }

    class IoCContainer<TYPES extends string> implements IIoCContainer<TYPES> {

        constructor() {
            privateMembers.set(this, new PrivateFieldsContainer<TYPES>());
            this.register = this.register.bind(this);
            this.unregister = this.unregister.bind(this);
            this.isRegistered = this.isRegistered.bind(this);
            this.resolve = this.resolve.bind(this);
        }

        public register<T extends object>(scope: InjectScopeEnum, interfaceO: TYPES, implementation: (c: IIoCContainer<TYPES>, ...args: any) => T): boolean {
            const { registeredObjects, singletonObjects } = PrivateFieldsContainer.get(this);

            if (singletonObjects[interfaceO] || registeredObjects[interfaceO]) {
                (console.error || console.log)(`Type [${interfaceO}] is already registered in IoC container.`);
                return false;
            }
            registeredObjects[interfaceO] = {
                scope,
                implementation
            };

            return true;
        }

        public unregister(interfaceO: TYPES): boolean {
            const { registeredObjects, singletonObjects } = PrivateFieldsContainer.get(this);

            if (singletonObjects[interfaceO]) {
                singletonObjects[interfaceO] = undefined;
                return true;
            }

            if (registeredObjects[interfaceO]) {
                registeredObjects[interfaceO] = undefined;
                return true;
            }

            return false;
        }

        public resolve<T extends object>(interfaceO: TYPES, ...args: any): T {
            const { registeredObjects, singletonObjects } = PrivateFieldsContainer.get(this);

            let result = singletonObjects[interfaceO];

            if (result) {
                return result as T;
            }

            const registered = registeredObjects[interfaceO];
            if (registered) {
                result = registered.implementation(this as any, args);
                if (registered.scope === InjectScopeEnum.SINGLETON) {
                    registeredObjects[interfaceO] = undefined;
                    singletonObjects[interfaceO] = result;
                }
            }

            if (result) {
                return result as T;
            }
            throw new Error(`Type [${interfaceO}] is not registered in IoC container.\nResolved object from IoC container can not be undefined or null.`);
        }

        public isRegistered(interfaceO: TYPES): boolean {
            const { registeredObjects, singletonObjects } = PrivateFieldsContainer.get(this);

            return (
                singletonObjects[interfaceO] !== undefined &&
                singletonObjects[interfaceO] !== null
            ) ||
                (
                    registeredObjects[interfaceO] !== undefined &&
                    registeredObjects[interfaceO] !== null
                );
        }
    }
    return IoCContainer;
})();

export * from './types';
export default function initDIContainer<TYPES extends string>(): IIoCContainer<TYPES> {
    return new IoCContainerClass<TYPES>();
}
