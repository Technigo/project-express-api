import express from "express";
import cors from "cors";
import bookData from "./data/books.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const navigation = {
    guide: "These are the routes for this book API!",
    Endpoints: [
      {
        "/bookData": "Display all books",
        "/bookData/authors/:authors": "Search for a author",
        "/bookData/title/:title": "Search for a title", 
        "/bookData/average_rating/": "Average rating of books - high to low",
        "/bookData/num_pages/": "The book with most number of pages",
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
app.get('/bookData/average_rating/', (req, res) => {
  const { average_rating } = req.params;
  const bookRating = bookData.sort((a, b) => b.average_rating - a.average_rating)
    res.json(bookRating.slice(0, [-1])) 
})

// if the user search for a author 
app.get('/bookData/authors/:authors', (req, res) => {
  const { authors } = req.params;

  let byAuthor = bookData;

  if (authors) {
    byAuthor = byAuthor
.filter((item) => item.authors.toLowerCase().includes(authors.toLowerCase()));
  };
  if (byAuthor.length === 0) {
    res.status(200).json({
      message: "We don't have any books by that author - did you spell correctly?",
      success: true,
    });
  } else {
    res.status(200).json({
      data: byAuthor,
      success: true,
    });
  };
  });

// if the user searches for title 
  app.get('/bookData/title/:title', (req, res) => {
    const { title } = req.params;
  
    let byTitle = bookData;
  
    if (title) {
      byTitle = byTitle
  .filter((item) => item.title.toLowerCase().includes(title.toLowerCase()));
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


// sorts the books in order from most to fewest pages
app.get('/bookData/num_pages/', (req, res) => {
  const { num_pages } = req.params;
  const bookPages = bookData.sort((a,b)=>b.num_pages-a.num_pages)
  res.json(bookPages[0]) 
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});