import { Loading } from 'app/view/components/Loading';
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react';

/**
 * Показывает элемент загрузки пока Component не загрузится
 * @param Component асинхронный компонент через React.lazy(import('...').then(({ element }) => ({ default: element }))
 */
export function asyncComponent(Component: LazyExoticComponent<ComponentType>): ComponentType {
    return () => {
        return (
            <Suspense fallback={ <Loading /> }>
                <Component />
            </Suspense>
        );
    };
}