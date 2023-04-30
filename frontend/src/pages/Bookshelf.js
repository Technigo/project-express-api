import React, { useState } from 'react'
import styled from 'styled-components'
import Book from '../components/Book'

const StyledBookshelf = styled.div``

const BookshelfBooks = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
gap: 10px;`

const Bookshelf = () => {
  const [bookshelfBooks, setBookshelfBooks] = useState([]);

  fetch('http://localhost:8080/books')
    .then((res) => res.json())
    .then((json) => setBookshelfBooks(json))

  return (
    <StyledBookshelf>
      <h1>Bookshelf</h1>
      <BookshelfBooks>
        {bookshelfBooks.map((book) => {
          return (<Book key={book.bookID} book={book} />)
        })}
      </BookshelfBooks>
    </StyledBookshelf>
  )
}

export default Bookshelf;