import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { fetchBooks } from 'reducers/bookstore'
import Book from '../components/Book'

const StyledBookshelf = styled.div``

const BookshelfBooks = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
gap: 10px;`

const Bookshelf = () => {
  const dispatch = useDispatch();

  const [bookshelfBooks, setBookshelfBooks] = useState([]);
  const [page, setPage] = useState(1);
  const bookshelfBooksStore = useSelector((state) => state.bookstore.books)

  const handleNextPage = () => {
    setPage(page + 1);
  }

  const handlePrevPage = () => {
    if (page >= 1) {
      setPage(page - 1);
    } else { setPage(1) }
  }

  useEffect(() => {
    dispatch(fetchBooks(page));
    setBookshelfBooks(bookshelfBooksStore)
  }, [dispatch, bookshelfBooksStore, page])

  return (
    <StyledBookshelf>
      <h1>Bookshelf</h1>
      <BookshelfBooks>
        {bookshelfBooks && bookshelfBooks.map((book) => {
          return (<Book key={book.bookID} book={book} />)
        })}
      </BookshelfBooks>
      {page > 1 && <button type="button" onClick={handlePrevPage}>previous page</button>}
      page: {page}
      <button type="button" onClick={handleNextPage}>next page</button>
    </StyledBookshelf>
  )
}

export default Bookshelf;