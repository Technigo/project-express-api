import express from "express";
import cors from "cors";
import booksData from "./data/books.json";
//import bodyParser from 'body-parser'


//import avocadoSalesData from "./data/avocado-sales.json";
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
//app.use(bodyParser.json())

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get("/books", (request, response) => {
  const books = booksData;
  if (books) {
    response.status(200).json({
      success: true,
      message: "ok",
      body: {
        booksData: books
      }
    });
  } else {
    response.status(500).json({
      success: false,
      message: "Something went wrong",
      body: {}
    });
  } 
})



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
