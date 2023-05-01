import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import styled from 'styled-components'

const BookviewContainer = styled.div``

const BookTitle = styled.h1``

const BookInfoContainer = styled.div``

const BookInfoText = styled.p``

const Bookview = ({ random }) => {
  const [book, setBook] = useState({});
  const { bookId } = useParams();
  console.log(`book id is ${bookId}`)

  useEffect(() => {
    if (random) {
      fetch('http://localhost:8080/random')
        .then((res) => res.json())
        .then((json) => setBook(json))
    } else {
      fetch(`http://localhost:8080/books/${bookId}`)
        .then((res) => res.json())
        .then((json) => setBook(json))
    }
  }, [random, bookId])

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