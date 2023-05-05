import { createSlice } from '@reduxjs/toolkit'
import { ui } from './ui'

const initialState = { books: [], book: {} }

export const bookstore = createSlice({
  name: 'bookstore',
  initialState,
  reducers: {
    setBookData: (state, action) => {
      state.book = action.payload
    },
    setBooksData: (state, action) => {
      state.books = action.payload
    },
    setResponse: (state, action) => {
      state.response = action.payload
    },
    restart: () => {
      return initialState;
    }

  }
})

export const fetchRandomBook = () => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true))
    fetch('http://localhost:8080/random', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }

    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(bookstore.actions.setBookData(json))
        dispatch(ui.actions.setLoading(false))
      })
  }
}