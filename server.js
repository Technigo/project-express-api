const express = require('express');
const bodyParser = require('body-parser');
const books = require('./data/books.json'); // Assuming your JSON data is in ./data/books.json

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());

// Root endpoint with API documentation
app.get('/', (req, res) => {
  res.send({
    Message: "📚 Hello and welcome to your digital library! 📚 Look for books at these endpoints:",
    Routes: [
      { "/books": "Show all books (450) data." },
      { "/books/top-rated": "Show books with an average rating of 4 or more." },
      { "/books/search?author=": "Show books by author search." },
      { "/books/title/:title": "Show books by title." },
      { "/books/lang/:lang": "Show books by language" }
    ]
  });
});

// Endpoint to get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Endpoint to get top-rated books (average rating of 4 or more)
app.get('/books/top-rated', (req, res) => {
  const topRatedBooks = books.filter(book => book.average_rating >= 4);
  res.json(topRatedBooks);
});

// Endpoint to search books by author
app.get('/books/search', (req, res) => {
  const { author } = req.query;
  if (!author) {
    return res.status(400).json({ message: 'Author query parameter is required.' });
  }

  const filteredBooks = books.filter(book =>
    book.authors.toLowerCase().includes(author.toLowerCase())
  );
  if (filteredBooks.length > 0) {
    res.json(filteredBooks);
  } else {
    res.status(404).json({ message: `No books found with authors containing "${author}"` });
  }
});

// Endpoint to get books by title
app.get('/books/title/:title', (req, res) => {
  const { title } = req.params;
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );
  if (filteredBooks.length > 0) {
    res.json(filteredBooks);
  } else {
    res.status(404).json({ message: `No books found with title containing "${title}"` });
  }
});

// Endpoint to get books by language code
app.get('/books/lang/:lang', (req, res) => {
  const { lang } = req.params;
  const filteredBooks = books.filter(book =>
    book.language_code.toLowerCase() === lang.toLowerCase()
  );
  if (filteredBooks.length > 0) {
    res.json(filteredBooks);
  } else {
    res.status(404).json({ message: `No books found with language code "${lang}"` });
  }
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
