import express from "express";
import cors from "cors";
import booksData from "./data/books.json"


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
// Access locally our server and recieve req cross origin (cors)
app.use(cors());
app.use(express.json());

// Start defining your routes here to grt access. 
//First argument is the route and then a callback function (req, rep).
// Req is Front End sends and response what we send back in res.send.
app.get("/", (req, res) => {
res.send({ responseMessage: "API about books" });
});

//Get all data for books
app.get("/books", (req, res) => {
  res.status(200).json({booksData})
});

//Reverse order of books
  app.get("/books/reversed", (req, res) => {
    const booksDataReversed = booksData.reverse()
    res.status(200).json({booksDataReversed})
  });

// if the user searches for title 
app.get("/books/title/:title", (req, res) => {
  const title = req.params.title;

  let byTitle = booksData;

  if (title) {
    byTitle = byTitle
.filter((data) => data.title.toLowerCase().includes(title.toLowerCase()));
  };
  if (byTitle.length === 0) {
    res.status(200).json({
      message: "There's no books here by that name",
      success: true,
    });
  } else {
    res.status(200).json({
      data: byTitle,
      success: true,
    });
  };
  });

  app.get("/books/:bookID", (req, res) => {
    const singleBook = booksData.find((book) => {
      return book.bookID === +req.params.bookID;
    });
    if(singleBook) {
      res.status(200).json({
        success: true,
        message: "OK",
        body: {
          booksData: singleBook
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Not found",
        body: {}
      });
    }
  });

// Start the server/application. It needs to listen to a port.
// That is defined in line 15. 
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
