import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';

const Bookview = (random) => {
  const [book, setBook] = useState({});

  useEffect(() => {
    if (random) {
      fetch('http://localhost:8080/random')
        .then((res) => res.json())
        .then((json) => setBook(json))
    } else {
      const bookId = { useParams }
      fetch(`http://localhost:8080/books/${bookId}`)
        .then((res) => res.json())
        .then((json) => setBook(json))
    }
  }, [random])

  return (<h1>{book.title}</h1>);
}

export default Bookview;