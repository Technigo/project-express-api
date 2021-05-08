import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import React from 'react'

import { StartScreen } from '../pages/StartScreen'
import { CategoryListScreen } from '../pages/CategoryListScreen'
import { SingleCategoryScreen } from '../pages/SingleCategoryScreen'
import { DetailScreen } from '../pages/DetailScreen'

export const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <StartScreen />
        </Route>
        <Route path="/title/:title" exact component={DetailScreen} />
        <Route
          path="/type/:type/:category/:singleCategory"
          exact
          component={SingleCategoryScreen} />
        <Route path="/type/:type" exakt component={CategoryListScreen} />
      </Switch>
    </Router>
  );
}