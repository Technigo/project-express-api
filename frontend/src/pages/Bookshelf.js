import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { bookstore } from 'reducers/bookstore'
import { ui } from 'reducers/ui'
import Book from '../components/Book'

const StyledBookshelf = styled.div``

const BookshelfBooks = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
gap: 10px;`

const Bookshelf = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const bookshelfBooks = useSelector((state) => state.bookstore.books)

  useEffect(() => {
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
  }, [page, dispatch])

  const handleNextPage = () => {
    setPage(page + 1);
  }

  const handlePrevPage = () => {
    if (page >= 1) {
      setPage(page - 1);
    } else { setPage(1) }
  }

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