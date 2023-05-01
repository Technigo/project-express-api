import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Book from '../components/Book'

const StyledBookshelf = styled.div``

const BookshelfBooks = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
gap: 10px;`

const Bookshelf = () => {
  const [bookshelfBooks, setBookshelfBooks] = useState([]);
  const [page, setPage] = useState(1);

  const handleNextPage = () => {
    setPage(page + 1);
  }

  const handlePrevPage = () => {
    if (page >= 1) {
      setPage(page - 1);
    } else { setPage(1) }
  }

  useEffect(() => {
    fetch(`http://localhost:8080/bookshelf/page/${page}`)
      .then((res) => res.json())
      .then((json) => setBookshelfBooks(json))
  }, [page])

  return (
    <StyledBookshelf>
      <h1>Bookshelf</h1>
      <BookshelfBooks>
        {bookshelfBooks.map((book) => {
          return (<Book key={book.bookID} book={book} />)
        })}
      </BookshelfBooks>
      <button type="button" onClick={handlePrevPage}>previous page</button>
      page: {page}
      <button type="button" onClick={handleNextPage}>next page</button>
    </StyledBookshelf>
  )
}

export default Bookshelf;