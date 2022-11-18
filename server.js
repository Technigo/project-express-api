import express, { response } from "express";
import cors from "cors";
//import technigoMembers from "./data/technigo-members.json";

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
//console.log("req", req);
//console.log("req", res);
 // res.send({responseMessage: "Hello Technigo!" }) // Already processing something as a json property, a raw body. String before = will be sending a string
  res.json({responseMessage: "Welcome to my page where you can find information on 500 books. Please add /*** in the address field to read about a book" }) // Expects an json object and will be sent accordingly. More secure. 
});  //KLAR

app.get("/books/:bookID", (req, res) => {
  const singleBookId = booksData.find((singleId) => {
    return singleId.bookID === +req.params.bookID;
  })
  res.status(200).json({singleBookId});
}); //KLAR

app.get("/languages/:language_code", (req, res) => {
  const showLanguage = booksData.filter((test) => {
    return test.language_code === req.params.language_code;
  })
  res.status(200).json({showLanguage});
}); //KLAR 


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
