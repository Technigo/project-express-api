import express from "express";
import cors from "cors";

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

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json({booksData});
});

app.get('/books', (req, res) => {
	const { author, title } = req.query
	let filteredBooks = booksData
	
	if(author) {
    const singleAuthor = filteredBooks.filter((item) => 
    item.authors.toLocaleLowerCase()
    .includes(author.toLocaleLowerCase()))

    if(singleAuthor.length === 0) {
      return res.status(404).json("Sorry we couldn't find the author you seek")
    } else {
      return res.json(singleAuthor);
	  }
  }
	if(title) {
    const singleTitle = filteredBooks.filter((item) => 
    item.title.toLocaleLowerCase()
    .includes(title.toLocaleLowerCase()))

    if(singleTitle.length === 0) {
      return res.status(404).json("Sorry we couldn't find book you seek")
    } else {
      return res.json(singleTitle);
	  }
	}
})

// filter books by id
// app.get("/books/:id", (req, res) => {
//   const singleBook = booksData.filter((item) => item.bookID == req.params.id)
//   if (singleBook.length === 0) {
//     return res.status(404).json("Sorry, this book does not exist. Try again with another number");
//   } else {
//     return res.json(singleBook)
//   }
// });

//filter books by specific author
app.get("/authors/:author", (req, res) => {
  const singleAuthor = booksData.filter((item) => item.authors === req.params.author)
  if (singleAuthor.length === 0) {
    return res.status(404).json("Sorry, this author does not exist. Try again with another name.");
  } else {
    return res.json(singleAuthor);
  }
});

//TODO fix pagination 

//sort by ratings in ascending order
app.get("/ratings/top100", (req, res) => {
    booksData.sort((a, b) => a.average_rating - b.average_rating).reverse();
    res.json(booksData);
});





// app.get("/members", (req, res) => {
//   res.status(200).json({technigoMembers : technigoMembers});
// });

// app.get("/members/:id", (req, res) => {
//   const singleId = req.params.id
//   const singleMember = technigoMembers.find((member) => member.id == singleId)
//   res.status(200).json(singleMember);
// });

// app.get("/nominations", (req, res) => {
//   res.json(goldenGlobesData)
// })

// app.get("/year/:year", (req, res) => {
//   const year = req.params.year
//   const showWin = req.query.win
//   let nominationsFromYear = goldenGlobesData.filter((item) => item.year_award === +year)

//   if (showWin) {
//     nominationsFromYear = nominationsFromYear.filter((item) => item.win)

//   }
//   res.json(nominationsFromYear)
// })

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
