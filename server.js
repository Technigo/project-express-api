import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";

// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing- dont change them
app.use(cors());
app.use(express.json());



// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

//the get is just the last part of https://localhost8080/booksData for example:
app.get('/booksData', (req, res) => {
  res.status(200).json({
    data: booksData,
    sucess: true,
  });
});


app.get('/booksData/:title', (req, res) => {
  const { title} = req.params;

  const bookByTitle = booksData.filter((booksData) => booksData.title === title);
  console.log("Book by title:", bookByTitle);
});

  //or if(!bookByTitle)
  //if(bookByTitle===undefined){
    //res.status(404).json({
      //data:"Not found",
      //sucess: false,
  //  });
  //} else{
  //res.status(200).json({
   // data: bookByTitle,
   // sucess: true,
  //});
//};
  
//});

// Start the server
app.listen(port, () => {
  console.log(`this is shown in terminal:Server running on http://localhost:${port}`);
});