import { createGlobalReduxStore } from 'app/redux/funcs/createGlobalReduxStore';
import { appRoutes } from 'app/ThisAppRoutes';
import { MainPage } from 'app/view/pages/MainPage';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { AsyncReducerRegistry, ReducerRegistryContext } from './core/redux';
const reducerRegistry = new AsyncReducerRegistry();
const store = createGlobalReduxStore(reducerRegistry, composeWithDevTools(applyMiddleware(thunk)));

// const CloudServicesPageAsync = asyncComponent(React.lazy(() => import('app/view/pages/administration/dictionaries/CloudServicesPage').then(({ CloudServicesPage }) => ({ default: CloudServicesPage }))));

class App extends React.Component {
  public render() {
    return (
      <Provider store={ store }>
        <ReducerRegistryContext.Provider value={ reducerRegistry }>
          <HashRouter>
            <SnackbarProvider maxSnack={ 10 } anchorOrigin={ {
              horizontal: 'right',
              vertical: 'bottom'
            } } >
              <div id="container">

                <Switch>
                  <Route exact={ true } path={ appRoutes.homeRoute } component={ MainPage } />
                </Switch>

              </div>
            </SnackbarProvider>
          </HashRouter>
        </ReducerRegistryContext.Provider>
      </Provider>
    );
  }
}

export default App;
