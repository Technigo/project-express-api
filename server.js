import express from "express";
import cors from "cors";
import data from "./data/books.json";
import listEndpoints from "express-list-endpoints";




const port = process.env.PORT || 8080;
const app = express();


app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json({endpoints})

  
});
app.get("/books" , (req,res) => {
  const limitData = data.slice(0 , 50)
 
  res.json(limitData)
} )

app.get('/books/:bookId', (req, res) => {
  const bookId = req.params.bookId
 
  const book = data.find(b => b.bookID === parseInt(bookId))
  if (book) {
      res.json(book)
  } else {
      res.status(404).send('Book not found')
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
