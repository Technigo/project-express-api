import express, { request } from "express"; // to create api
import cors from "cors"; //cors- To have request from same origin. Frontend and backend can both work from localhost
import netflixData from "./data/netflix-titles.json";
import booksData from "./data/books.json";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import goldenGlobesData from "./data/golden-globes.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:

// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json()); //Allows us to read the body from the request as a json

// Start defining your routes here
app.get("/", (req, res) => {
  res.json({responseMessage: "Hello Technigo"}); //safer. Exicute
});



app.get("/netflix", (req, res) => {
  const { title } = req.query
  let netflix = netflixData; //default response

  if(title) {
    netflix = netflix.filter((item) =>
    item.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()))
  }
  if(netflix.length === 0)
  {res.status(404).json
  ("We could not find this movie")
  }

  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      netflixData: netflix
    }
  });
});

app.get("/netflix/:year", (request, response) => {
  const singelMember = netflixData.find((member) => {
    return member.release_year === +request.params.id
  })
  if(singelMember)
  response.status(200).json({
    success: false,
    message: "NOT FOUND",
    body: {
    }
    });
});



// BOOKS
// First endpoint
app.get("/books", (req, res) => {
  res.status(200).json({booksData: booksData}); //safer. Exicute
});

//Second endpoint
app.get("/books/:id", (request, response) => {
  const singelBook = booksData.find((book) => {
    return book.bookID === +request.params.id
  })
  response.status(200).json(singelBook); //safer. Exicute
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
