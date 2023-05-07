import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components'
import { bookstore } from 'reducers/bookstore';
import Loading from '../components/Loading'

const BookviewContainer = styled.div`
display: flex;
flex-direction: column;
margin: 0 auto;
width: 50vh;`

const BookTitle = styled.h1``

const BookInfoContainer = styled.div`display: flex; flex-direction: column;`

const BookInfoText = styled.p``

const Bookview = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const bookData = useSelector((state) => state.bookstore.book)
  const navigate = useNavigate();
  const onBackButtonClick = () => {
    navigate(-1);
  }
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/books/${bookId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(bookstore.actions.setBookData(json.body.book))
      })
      .finally(() => { setLoading(false); })
      .catch((error) => console.error(error));
  }, [dispatch, bookId]);

  if (loading) { return <Loading /> }

  return (

    <BookviewContainer>
      <BookTitle>{bookData.title}</BookTitle>
      <BookInfoContainer>
        <Link
          key={bookData.authors}
          to={`/books/author/${bookData.authors}`}>
          <BookInfoText>by {bookData.authors}</BookInfoText>
        </Link>
        <BookInfoText>
          {bookData.average_rating} / 5 ({bookData.ratings_count} ratings)
        </BookInfoText>
        <BookInfoText>
            nr of pages: {bookData.num_pages}
        </BookInfoText>
      </BookInfoContainer>
      <button type="button" onClick={onBackButtonClick}>back</button>
    </BookviewContainer>

  );
}

export default Bookview;