import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import booksData from "./data/books.json"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// listed endpoints here, had to removed it since it crashed app - new try when code is done


// Start Route
app.get("/", (req, res) => {
  res.send(" Hello go to --> /books la ");
});

//shows the available endpoints
app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app))
});


app.get("/books", (req, res) => {
  const { author, title  } = req.query; //params
  let filteredBooks = booksData;

  if (author) {
    filteredBooks = filteredBooks
    .filter((item) => item.authors.toLocaleLowerCase()
    .includes(author.toLocaleLowerCase()))
  };
  if (title) {
    filteredBooks = filteredBooks
    .filter((item) => item.title.toLocaleLowerCase()
    .includes(title.toLocaleLowerCase()))
  };
  if (filteredBooks.length === 0) {
    res.status(404).json({
      success: false,
      data: "could not find a match for your search",
  }); 
  } 

  res.status(200).json({ 
  success: true,
  message: "OK", 
    body: { 
      booksData: filteredBooks
    }
  });
});

//add return statement when using {}
app.get("/books/:isbn", (req, res) => {  
  const singleBook = booksData.find((item) => { 
    return item.isbn === Number(req.params.isbn); 
})
if (!singleBook) {
  res.status(404).json("Could not find a book that match the isbn number")
     } else 
     res.status(200).json({
     success: true,
     message: "OK",
        body: { 
          singleBook 
        }
}); 
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

