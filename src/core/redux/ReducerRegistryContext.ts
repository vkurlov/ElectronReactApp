import React from 'react';
import { AsyncReducerRegistry } from '.';

export const ReducerRegistryContext = React.createContext<AsyncReducerRegistry>(null as unknown as AsyncReducerRegistry);
