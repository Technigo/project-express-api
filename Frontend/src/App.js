import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Route, Switch } from 'react-router-dom'

import netflix from './reducers/netflix';
import { StartScreen } from './pages/StartScreen'
import { CategoryListScreen } from './pages/CategoryListScreen'
import { SingleCategoryScreen } from './pages/SingleCategoryScreen'

export const App = () => {
  const reducer = combineReducers({
    netflix: netflix.reducer
  });

  const store = configureStore({ reducer });

  return (
    <Provider store={store}>
      <Switch>
        <Route path="/" exact>
          <StartScreen />
        </Route>
        <Route path="/type/:type" exact component={CategoryListScreen} />
        <Route path="/type/:type/:category/:singleCategory" component={SingleCategoryScreen} />
      </Switch>
    </Provider>
  )
}
