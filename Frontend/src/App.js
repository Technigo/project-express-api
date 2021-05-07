import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Route, Switch } from 'react-router-dom'

import netflix from './reducers/netflix';
import { StartScreen } from './pages/StartScreen'
import { CategoryListScreen } from './pages/CategoryListScreen'
import { SingleCategoryScreen } from './pages/SingleCategoryScreen'
import { DetailScreen } from './pages/DetailScreen'

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
        <Route path="/title/:title" exact component={DetailScreen} />
        <Route path="/type/:type/:category/:singleCategory" exact component={SingleCategoryScreen} />
        <Route path="/type/:type" exakt component={CategoryListScreen} />
      </Switch>
    </Provider>
  )
}
