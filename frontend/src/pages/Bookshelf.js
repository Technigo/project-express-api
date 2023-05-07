import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import { bookstore } from 'reducers/bookstore'
import Book from '../components/Book'
import Loading from '../components/Loading'

const StyledBookshelf = styled.div``

const BookshelfBooks = styled.div`
display: grid;
grid-template-columns: 1fr;
gap: 10px;
margin: 0 auto;

@media (min-width:600px) {
  grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`
const StyledPageDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
padding: 10px;`

const Bookshelf = () => {
  const { author } = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const bookshelfBooks = useSelector((state) => state.bookstore.books)

  useEffect(() => {
    setLoading(true);
    // if an author parameter is provided, fetch all books from the author
    if (author) {
      fetch(`http://localhost:8080/books/author/${author}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((json) => {
          dispatch(bookstore.actions.setBooksData(json.body.books));
        })
        .finally(() => { setLoading(false); })
        .catch((error) => console.error(error));
    } else { // if not, just fetch all books
      fetch(`http://localhost:8080/bookshelf/page/${page}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((json) => {
          dispatch(bookstore.actions.setBooksData(json.body.books));
        })
        .finally(() => { setLoading(false); })
        .catch((error) => console.error(error));
    }
  }, [dispatch, page, author])

  const handleNextPage = () => {
    setPage(page + 1);
  }

  const handlePrevPage = () => {
    if (page >= 1) {
      setPage(page - 1);
    } else { setPage(1) }
  }

  if (loading) { return <Loading /> }

  return (
    <StyledBookshelf>
      <BookshelfBooks>
        {bookshelfBooks && bookshelfBooks.map((book) => {
          return (<Book key={book.bookID} book={book} />)
        })}
      </BookshelfBooks>
      <StyledPageDiv>
        {page > 1 && <button type="button" onClick={handlePrevPage}>previous page</button>}
      page: {page}
        <button type="button" onClick={handleNextPage}>next page</button>
      </StyledPageDiv>
    </StyledBookshelf>
  )
}

export default Bookshelf;