import { createSlice } from '@reduxjs/toolkit'

const initialState = { books: [], book: {}, loading: false }

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

