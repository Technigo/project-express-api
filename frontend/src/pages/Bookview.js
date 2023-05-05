import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components'
import { bookstore } from 'reducers/bookstore';
import { ui } from 'reducers/ui'

const BookviewContainer = styled.div``

const BookTitle = styled.h1``

const BookInfoContainer = styled.div``

const BookInfoText = styled.p``

const Bookview = (random) => {
  const [book, setBook] = useState({});
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const bookData = useSelector((state) => state.bookstore.book)
  let fetchUrl = ''
  if (random) { fetchUrl = 'http://localhost:8080/random' } else { fetchUrl = `http://localhost:8080/books/${bookId}` }

  useEffect(() => {
    dispatch(ui.actions.setLoading(true))
    fetch(fetchUrl, {
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
      .finally(dispatch(ui.actions.setLoading(false)))
    setBook(bookData);
  }, [bookId, bookData, dispatch, fetchUrl]);

  return (
    <BookviewContainer>
      <BookTitle>{book.title}</BookTitle>
      <BookInfoContainer>
        <BookInfoText>by {book.authors}</BookInfoText>
        <BookInfoText>
          {book.average_rating} / 5 ({book.ratings_count} ratings)
        </BookInfoText>
        <BookInfoText>
            nr of pages: {book.num_pages}
        </BookInfoText>
      </BookInfoContainer>
    </BookviewContainer>

  );
}

export default Bookview;