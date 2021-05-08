import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit';


import netflix from './reducers/netflix';
import { Routing } from './components/Routing'

export const App = () => {
  const reducer = combineReducers({
    netflix: netflix.reducer
  });

  const store = configureStore({ reducer });

  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  )
}
