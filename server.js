import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Documentación de la API
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Books API",
    routes: [
      { method: "GET", endpoint: "/books", description: "Get all books" },
      { method: "GET", endpoint: "/books/:id", description: "Get a single book by ID" },
      { method: "GET", endpoint: "/books/search", description: "Search books by query parameters" },
      { method: "GET", endpoint: "/books/page", description: "Get paginated books" },
    ],
  });
});

// Obtener todos los libros
app.get("/books", (req, res) => {
  res.json(booksData);
});

// Endpoint para la paginación
app.get("/books/page", (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  if (isNaN(pageNum) || isNaN(limitNum) || pageNum <= 0 || limitNum <= 0) {
    return res.status(400).json({ error: "Invalid page or limit parameters" });
  }

  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;

  const paginatedBooks = booksData.slice(startIndex, endIndex); // Aquí corregimos 'books' a 'booksData'

  if (paginatedBooks.length === 0) {
    return res.status(404).json({ error: "No books found for the given page" });
  }

  res.json({
    page: pageNum,
    limit: limitNum,
    totalBooks: booksData.length,
    books: paginatedBooks,
  });
});

// Endpoint para buscar libros
app.get("/books/search", (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: "Query parameter 'title' is required" });
  }

  const results = booksData.filter((book) =>
    book.title.toLowerCase().includes(title.toLowerCase()) // Cambié 'books' por 'booksData'
  );

  if (results.length === 0) {
    return res.status(404).json({ error: "No books found with the given title" });
  }

  res.json(results);
});

// Endpoint para obtener un libro por ID
app.get("/books/:id", (req, res) => {
  const { id } = req.params;

  const book = booksData.find((book) => book.bookID === parseInt(id)); // Cambié 'books' por 'booksData'

  if (!book) {
    return res.status(404).json({ error: `Book with ID ${id} not found` });
  }

  res.json(book);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
