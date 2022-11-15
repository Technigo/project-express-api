import express from "express";
import cors from "cors";
import bookData from "./data/books.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const navigation = {
    API_description: "These are the routes for this book API",
    Endpoints: [
      {
        "/bookData": "Display all books",
        "/bookData/average_rating/": "Average rating of books",
        "/bookData/num_pages/": "Sorts the books based on number of pages",
      },
    ],
  };
  res.send(navigation);
});

// get all the books and their data
app.get('/bookData', (req, res) => {
  res.status(200).json({
    data: bookData,
    success: true,
  })
  })

// sorts the api to display  book rating from highest to lowest
app.get("/bookData/average_rating/", (req, res) => {
  const { average_rating } = req.params;
  const bookRating = bookData.sort((a, b) => b.average_rating - a.average_rating)
    res.json(bookRating.slice(0, [-1])) 
})

// sorts the books in order from most to fewest pages
app.get("/bookData/num_pages/", (req, res) => {
  const { num_pages } = req.params;
  const bookPages = bookData.sort((a,b)=>b.num_pages-a.num_pages)
  res.json(bookPages[0]) 
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});