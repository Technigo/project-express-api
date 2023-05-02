import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components'
import { fetchRandomBook, fetchBook } from 'reducers/bookstore';

const BookviewContainer = styled.div``

const BookTitle = styled.h1``

const BookInfoContainer = styled.div``

const BookInfoText = styled.p``

const Bookview = ({ random }) => {
  const [book, setBook] = useState({});
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const bookData = useSelector((state) => state.bookstore.book)

  useEffect(() => {
    if (random) {
      dispatch(fetchRandomBook());
      setBook(bookData);
    } else {
      dispatch(fetchBook(bookId));
      setBook(bookData);
    }
  }, [])

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