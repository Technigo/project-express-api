import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { bookstore } from './reducers/bookstore.js'
import { ui } from './reducers/ui.js'
import Main from './pages/Main'

const reducer = combineReducers({
  bookstore: bookstore.reducer,
  ui: ui.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}
