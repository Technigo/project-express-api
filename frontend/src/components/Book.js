import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const BookContainer = styled.div`
border: 2px solid black;
display: flex;
flex-direction: column;
padding: 5px;
transition: scale 0.1s ease-in-out;

p { font-size: 11px;}

:hover {
cursor: pointer;
  background: #8e9eab;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #eef2f3, #8e9eab);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #eef2f3, #8e9eab); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  scale: 1.05;
  box-shadow: 2px 2px 2px 2px lightgrey;
}

`

const BookTitle = styled.h1`
font-size: 15px;`

const BookAuthors = styled.h2`
font-size: 12px;`

const AuthorAndRatingContainer = styled.div`
display: flex;
flex-direction: column;
justify-items: flex-end;
`

const Rating = styled.p``

const Book = (book) => {
  return (
    <Link
      key={book.book.bookID}
      to={`/book/${book.book.bookID}`}>
      <BookContainer>
        <BookTitle>{book.book.title}</BookTitle>

        <AuthorAndRatingContainer>
          <BookAuthors>{book.book.authors}</BookAuthors>
          <Rating>
            {book.book.average_rating} / 5 ({book.book.ratings_count} ratings)
          </Rating>
        </AuthorAndRatingContainer>
      </BookContainer>
    </Link>
  );
}

export default Book;