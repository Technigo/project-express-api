import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
// import members from "./data/technigo-members.json";
import prints from './data/print-collection.json'

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
const infoGreeting = {
  Info: 
  "A print API",

  Endpoints: [
    {
      "/prints": "lists all of the prints",
   "prints/year/{year}": "find prints per year created",
   "prints/title/{title}": "find prints per title",
   "prints/price/{price}": "see price",
   "prints/media/{media}": "see what type of media was used"
    }
  ],

  More:
  "See more at https://emmasprings.com"


}
  res.send(infoGreeting);
});

app.get("/prints", (req, res) => {
  const { title, year, media, price, size, url } = req.query;
  
  const allPrints = prints;

  if (title) {
    allPrints = allPrints.filter(print => print.title.toLowerCase() === title.toLowerCase())
  }

  // if (media) {
  //   allPrints = allPrints.filter(print => print.media.toLowerCase() === media.toLowerCase())
  // }

  res.status(200).json({
    data: prints,
    success: true,
  });
});

app.get("/prints/year/:year", (req, res) => {
  const { year } = req.params;

  const printByYear = prints.filter(print => print.year === year);
  console.log('print made year:', printByYear)

  if (!printByYear) {
    res.status(404).json({
      data: "Not found",
      success: false,
    });
  } else {
    res.status(200).json({
      data: printByYear,
      success: true,
    });
  }
});

app.get('/prints/title/:title', (req, res) => {
  const { title } = req.params;

  const printByTitle = prints.find((prints) => prints.title.toLowerCase() === title.toLowerCase())
  // console.log('Prints by price:', printByPrice)

  res.status(200).json({
    data: printByTitle,
    success: true,
  })
})

app.get('/prints/media/:media', (req, res) => {
  const { media } = req.params;

  const printByMedia = prints.filter(print => print.media.toLowerCase() === media.toLowerCase())

  res.status(200).json({
    data: printByMedia,
    success: true,
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
