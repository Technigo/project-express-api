import express from "express";
import cors from "cors";

import booksData from "./data/books.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

//1. endpoint that returns the whole array of book ratings.
app.get("/bookratings", (req, res) => {
  res.status(200).json({
    data: booksData,
    success: true,
  });
});

// 2. endpoint that returns a rated book by its title.
app.get("/bookratings/title/:title", (req, res) => {
  const { title } = req.params;

  const bookByTitle = booksData.find(
    (book) => book.title.toLowerCase === title.toLowerCase
  );

  if (!bookByTitle) {
    res.status(404).json({
      data: "Not found",
      success: false,
    });
  } else {
    res.status(200).json({
      data: bookByTitle,
      success: true,
    });
  }
});

// 3. endpoint that returns all rated books written by a specific author.
app.get("/bookratings/authors/:authors", (req, res) => {
  const { authors } = req.params;

  const bookByAuthor = booksData.filter(
    (book) => book.authors.toLowerCase() === authors.toLowerCase()
  );

  if (!bookByAuthor) {
    res.status(404).json({
      data: "Not found",
      success: false,
    });
  } else {
    res.status(200).json({
      data: bookByAuthor,
      success: true,
    });
  }
});


 app.get("/bookratings/rating/:rating", (req, res)=>{
   const {average_rating} = req.params;

   const bookByRating = booksData.filter(
     (book)=> book.average_rating === average_rating);
     res.status(200).json({
       data: bookByRating,
       success: true
     })
 })

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
