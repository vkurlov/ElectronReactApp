import { createStore as reduxCreateStore, StoreEnhancer } from 'redux';
import thunk from 'redux-thunk';
import { combineAllReducersToOne } from '.';
import { AsyncReducerRegistry } from '..';
import { TReducersContainer } from '../types';

/**
 * Creates REDUX store
 * @param initialReducers - Initial reducers
 * @param reducerRegistry - Asynchronous producer registry
 * @param enhancer - Enhancers, default is "thunk" from "redux-thunk" package
 */
export function createStore<TInitialReducerStates extends string>(
  initialReducers: TReducersContainer<TInitialReducerStates>,
  reducerRegistry: AsyncReducerRegistry,
  enhancer: StoreEnhancer) {
  const commonReducer = combineAllReducersToOne([
    initialReducers,
    reducerRegistry.getReducers()
  ]);

  const store = reduxCreateStore(
    commonReducer,
    enhancer ?? thunk
  );

  reducerRegistry.setChangeListener(reducers => {
    store.replaceReducer(combineAllReducersToOne([initialReducers, reducers]));
  });

  return store;
}
