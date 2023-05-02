import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (request, response) => {
  response.send("Hello Technigo! This is Matilda speaking");
});

// Will return a full list of the dataset
// If it does not find any books, it returns error message and empty body
app.get("/books", (request, response) => {
  let books = booksData
  if (books) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        books: books
      }
    });
} else {
  response.status(500).json({
    success: false,
    message: "Something went wrong",
    body: {}
  });
}
});

// Will return a single book based on the id
// If the book does nit exist, it will return an error code & empty body
app.get("/book/:id", (request, response) => {
  const { id } = request.params;
  const booksId = booksData.find((item) => {return item.bookID === Number(id)})
  console.log('id:', id)
  console.log('booksId:', booksId)

  if (booksId) {
      response.status(200).json({
        success: true,
        message: "OK",
        body: {
          book: booksId
        }
      });
    } else {
      response.status(404).json({
        success: false,
        message: "Book not found",
        body: {}
      });
}
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
