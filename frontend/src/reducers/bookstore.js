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

export const fetchBooks = (page) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true))
    fetch(`http://localhost:8080/bookshelf/page/${page}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(bookstore.actions.setBooksData(json));
      })
      .finally(dispatch(ui.actions.setLoading(false)))
  }
}

export const fetchBook = (bookId) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true))
    fetch(`http://localhost:8080/books/${bookId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }

    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(bookstore.actions.setBookData(json))
      })
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }
}

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
      })
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }
}