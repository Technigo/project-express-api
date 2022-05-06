import express from "express";
import cors from "cors";

import booksData from "./data/books.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json(
    {
      "Open API": "Books",
      "Routes": [
        {
          "/books": "Get all books",
          "/books/:id": "Get book whose id matches",
          "/ratings/:rating": "Get books whose rating starts with the number provided"
        }
      ],
      "Queries": [
        {
          "/books?author=string": "Get all books whose author contains the string provided",
          "/books?title=string": "Get all books whose title contains the string provided",
        }
      ]
    }
  );
});

app.get('/books', (req, res) => {
	const { author, title } = req.query;
	let filteredBooks = booksData;
	
	if(author) {
    console.log(filteredBooks.length);
		filteredBooks = filteredBooks.filter((item) => 
      item.authors.toLowerCase()
      .includes(author.toLowerCase()));
	};

	if(title) {
		filteredBooks = filteredBooks.filter((item) => 
			item.title.toLowerCase()
			.includes(title.toLowerCase()))
	};
	
	if (filteredBooks.length === 0) {
		res.status(404).json({
      data: "Sorry we couldn't find book you seek",
      success: false
    });
	} else {
		res.status(200).json({
      data: filteredBooks,
      success: true
    })
	};
});

app.get("/books/:id/", (req, res) => {
  const bookByID = booksData.find(
    (book) => book.bookID === parseInt(req.params.id));

  if (!bookByID) {
    res.status(404).json({
      data: "Not found",
      success: false
    })
  } else {
    res.status(200).json({
      data: bookByID,
      success: true
    })
  }
});

app.get("/ratings/:rating", (req, res) => {
  const rating = req.params.rating;
  const averageRatings = booksData.filter((book) => parseInt(book.average_rating) === parseInt(rating));

  if (!averageRatings) {
    res.status(404).json({
      data: 'Not found',
      success: false
    });
  } else {
    res.status(200).json({
      data: averageRatings,
      success: true
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
