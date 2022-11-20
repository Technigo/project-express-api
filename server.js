import express, { request } from "express";
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
// when starting the server. Example command to overwrite PORT enviremental variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here, the thing that you want to get from the database. To get to the route
// in the browser you write "/" and then the name of the route 
app.get("/", (req, res) => {
  res.json({responsMessage: "Let us see if this message will show and if it is possible to search for book titles and authors"});
});

app.get("/books", (req, res) => {
  const { authors, title } = req.query;
  let books = booksData;
  //new endpoint of the route
  if (authors) {
    books = books.filter(name => name.authors.toLowerCase() === 
    authors.toLowerCase());
  }
// another endpoint
  if (title) {
    books = books.filter(singleBook => { return singleBook.title.toLowerCase() === 
      title.toLowerCase()});
  }
  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      booksData: books
    }
  });
});

 /* if(authors) {
		books.filter((item) => 
			item.authors.toLocaleLowerCase()
			.includes(authors.toLocaleLowerCase()))
	}
	if(title) {
		books.filter((item) => 
			item.title.toLocaleLowerCase()
			.includes(title.toLocaleLowerCase()))
	}
	
	if(books.length === 0) {
		res.status(404)
			.json("Sorry we couldn't find book you seek")
	} else {
		res.json(books)
	}
}); */

// This is the path param
app.get("/books/:bookID", (req, res) => {
  const singleBook = booksData.find((item) => {
    return item.bookID === +req.params.bookID;
  });
  console.log(singleBook);

  if(singleBook) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        book: singleBook
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Not Found",
      body: {}
    });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
