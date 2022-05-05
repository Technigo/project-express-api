import express from "express";
import cors from "cors";

import sorting from "./models/sorting";
import pagination from "./models/pagination";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
// console.log(booksData);

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// app.get("/books", (req, res) => {
  // const { name, id } = req.query;

  // const allBooks = booksData;

//   res.status(200).json({
//     data: booksData,
//     success: true
//   });
// });


app.get('/books', (req, res) => {
	const { author, title } = req.query;
	let filteredBooks = booksData;
  console.log(author, title)
	
	if(author) {
		filteredBooks.filter((item) => 
			item.authors.toLocaleLowerCase()
			.includes(author.toLocaleLowerCase()))
	}
	if(title) {
		filteredBooks.filter((item) => 
			item.title.toLocaleLowerCase()
			.includes(title.toLocaleLowerCase()))
	}
	
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
  // console.log(req.params);

    
  res.status(200).json(bookByID);
});

app.get("/ratings/:rating", (req, res) => {
  const rating = req.params.rating;
  // let averageRatings = booksData.filter((book) => book.average_rating.toString().slice(0, 1) === rating);
  let averageRatings = booksData.filter((book) => parseInt(book.average_rating) === parseInt(rating));

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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
