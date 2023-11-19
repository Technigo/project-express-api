import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import booksData from "./data/books.json";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here

// endpoint for the root of the API, with a welcome message including quick links to the endpoints available

app.get('/', (req, res) => {
  res.send( ` Welcome to the Books API! Here are some quick links to get you started:
  <br>
  <br>
  <a href="http://localhost:8080/books">All books</a>
  <br>
  <a href="http://localhost:8080/books/1">Individual book by ID</a>
  <br>
  <a href="http://localhost:8080/language/eng">All books in a language</a>
  <br>
  <a href="http://localhost:8080/languages">All languages</a>
  <br>
  <a href="http://localhost:8080/author/J.K.%20Rowling">All books by an author</a>
  <br>
  <a href="http://localhost:8080/authors">All authors</a>
  <br>
  <a href="http://localhost:8080/ratings">All book ratings</a>
  <br>
  <a href="http://localhost:8080/stats">Statistics</a>
  <br>
  
  `);

});

// endpoint for all books
app.get('/books', (req, res) => {
  res.json(booksData);
}
);

// endpoint for individual book id
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const book = booksData.find((item) => item.bookID === +bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found, please try another ID' });
  }
});

// endpoint for book language
app.get('/language/:language', (req, res) => {
  const language = req.params.language;
  const booksInLanguage = booksData.filter((item) => item.language_code === language);
  if (booksInLanguage.length > 0) {
    res.json(booksInLanguage);
  } else {
    res.status(404).json({ message: 'Language not found, please try another one or check your spelling' });
  }
});

// endpoint for all languages
app.get('/languages', (req, res) => {
  const allLanguages = [...new Set(booksData.map((item) => item.language_code))];
  const allLanguagesWithLink = allLanguages.map((language) => {
    return {
      language: language,
      link: `http://localhost:8080/language/${language}`
    }
  })
  res.json(allLanguagesWithLink);

});

// endpoint for a book author
app.get('/author/:author', (req, res) => {
  const author = req.params.author;
  const booksByAuthor = booksData.filter((item) => item.authors === author);
  if (booksByAuthor.length > 0) {
    res.json(booksByAuthor);
  } else {
    res.status(404).json({ message: 'Author not found, please check your query or try another one' });
  }
});

// endpoint for all book authors with links to individual author endpoint
// here the author name is formatted so it can be used in the link
const formatAuthorName = (author) => {
  const authorName = author.split(" ").join("%20");
  return authorName;
}

app.get('/authors', (req, res) => {
  const allAuthors = [...new Set(booksData.map((item) => item.authors))];
  const allAuthorsWithLink = allAuthors.map((author) => {
    return {
      author: author,
      link: `http://localhost:8080/author/${formatAuthorName(author)}`
    }
  })

  res.json(allAuthorsWithLink);

});

//endpoint for rating
app.get('/rating/:rating', (req, res) => {
  const rating = req.params.rating;
  const booksByRating = booksData.filter((item) => item.average_rating === +rating);
  if (booksByRating.length > 0) {
    res.json(booksByRating);
  } else {
    res.status(404).json({ message: 'Rating not found, please check your query or try another one' });
  }
});

// endpoint for all book ratings with links to individual rating endpoint
app.get('/ratings', (req, res) => {
  const allRatings = [...new Set(booksData.map((item) => item.average_rating))];
  const allRatingsWithLink = allRatings.map((rating) => {
    return {
      rating: rating,
      link: `http://localhost:8080/rating/${rating}`
    }
  })

  res.json(allRatingsWithLink);

}
);

// endpoint listing Number of books, Number of authors, Number of languages and lastly a link to starter page

app.get('/stats', (req, res) => {
  const numberOfBooks = booksData.length;
  const numberOfAuthors = [...new Set(booksData.map((item) => item.authors))].length;
  const numberOfLanguages = [...new Set(booksData.map((item) => item.language_code))].length;

  res.json({
    numberOfBooks: numberOfBooks,
    numberOfAuthors: numberOfAuthors,
    numberOfLanguages: numberOfLanguages,
    link: `http://localhost:8080/`
  });
}
);

// POST (Create): This method is used to submit data to be processed to a specified resource

app.post('/books', (req, res) => {
  const newBook = req.body;
  booksData.push(newBook);
  res.json(newBook);
}
);

// PUT (Update): This method is used to update a current resource with new data

app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const bookIndex = booksData.findIndex((item) => item.bookID === +bookId);
  const updatedBook = { ...booksData[bookIndex], ...req.body };
  booksData[bookIndex] = updatedBook;
  res.json(updatedBook);
}
);


// DELETE: This method is used to delete a specified resource

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const bookIndex = booksData.findIndex((item) => item.bookID === +bookId);
  booksData.splice(bookIndex, 1);
  res.json(booksData);
}
);


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


