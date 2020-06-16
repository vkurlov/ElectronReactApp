import { TReducerObject, TReducersContainer } from './types';

export class AsyncReducerRegistry {
  private reducers: TReducersContainer<string> = {};
  private emitChange: ((reducers: TReducersContainer<string>) => void) | null = null;

  /**
   * Removes reducer's state from common state
   * @param reducerNames Reducers to remove from common state
   */
  public removeReducers(reducerNames: string[]) {
    if (!reducerNames || !reducerNames.length) {
      return;
    }

    for (const reducerName of reducerNames) {
      if (this.reducers[reducerName]) {
        delete this.reducers[reducerName];
      }
    }

    this.raiseEmitChange();
  }

  /**
   *
   * @param reducerNames - Reducers to add to common state
   * @param getReducer - function to check did reducer's state add or not
   */
  public async addOnlyNewReducersAsync(
    reducerNames: string[],
    getReducer: (reducerName: string) => Promise<TReducerObject<any, any>>
  ): Promise<void> {
    if (!reducerNames || !getReducer) {
      return;
    }

    const newReducers: TReducersContainer<string> = {};
    const currentReducerNames = Object.keys(this.reducers);

    for (const reducerName of reducerNames) {
      if (currentReducerNames.indexOf(reducerName) === -1) {
        newReducers[reducerName] = await getReducer(reducerName);
      }
    }

    this.reducers = { ...this.reducers, ...newReducers };
    this.raiseEmitChange();
  }

  private raiseEmitChange() {
    if (this.emitChange) {
      this.emitChange(this.getReducers());
    }
  }

  /**
   * Gets all registered reducers
   */
  public getReducers() {
    return { ...this.reducers };
  }

  /**
   * Set listener to handle every change in common reducer's state
   * @param listener - function to call on change in common reducer's state
   */
  public setChangeListener(listener: (reducers: TReducersContainer<string>) => void) {
    if (this.emitChange != null) {
      throw new Error('Can only set the listener for a ReducerRegistry once.');
    }
    this.emitChange = listener;
  }
}
