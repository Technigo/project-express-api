import express, { response } from "express";
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

// Middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// My routes
app.get("/", (req, res) => {
  res.json({responseMessage: "Welcome to my page where you can find information on 500 books. Please add /books/ and then a number in between 1-500, or /languages/ and for example 'fre' to see books in french." }) // Expects an json object and will be sent accordingly. More secure. 
});  

app.get("/books/:bookID", (req, res) => {
  const singleBookId = booksData.find((singleId) => {
    return singleId.bookID === +req.params.bookID;
  })
  res.status(200).json({singleBookId});
}); 

app.get("/languages/:language_code", (req, res) => {
  const showLanguage = booksData.filter((test) => {
    return test.language_code === req.params.language_code;
  })
  res.status(200).json({showLanguage});
}); 

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
