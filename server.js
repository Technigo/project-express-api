import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from "./data/golden-globes.json";
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
import netflixData from "./data/netflix-titles.json";
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

// a function in which express passes two arguments.
// req handles what frontend sends to backend
// what backend sends back to frontend
app.get("/titles", (req, res) => {
  const { cast, director, genre, type, country, title } = req.query;
  let netflixDataToSend = netflixData;

  if (cast) {
    netflixDataToSend = netflixDataToSend.filter(
      (item) => item.cast.toLowerCase().indexOf(cast.toLowerCase()) !== -1
    );
  }

  if (director) {
    netflixDataToSend = netflixDataToSend.filter(
      (item) =>
        item.director.toLowerCase().indexOf(director.toLowerCase()) !== -1
    );
  }

  if (genre) {
    netflixDataToSend = netflixDataToSend.filter(
      (item) => item.listed_in.toLowerCase().indexOf(genre.toLowerCase()) !== -1
    );
  }

  if (type) {
    netflixDataToSend = netflixDataToSend.filter(
      (item) => item.type.toLowerCase().indexOf(type.toLowerCase()) !== -1
    );
  }

  if (country) {
    netflixDataToSend = netflixDataToSend.filter(
      (item) => item.country.toLowerCase().indexOf(type.toLowerCase()) !== -1
    );
  }

  if (title) {
    netflixDataToSend = netflixDataToSend.filter(
      (item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
    );
  }

  res.json({
    response: netflixDataToSend,
    success: true,
  });
});

app.get("/titles/id/:id", (req, res) => {
  const { id } = req.params;

  const displayId = netflixData.find((item) => item.show_id === +id);

  if (!displayId) {
    res.status(404).json({
      response: `There is no title with this id`,
      success: false,
    });
  } else {
    res.status(200).json({
      response: displayId,
      success: true,
    });
  }
});

app.get("/titles/title/:title", (req, res) => {
  const { title } = req.params;

  const displayTitle = netflixData.find(
    (item) => item.title.toLowerCase() === title.toLowerCase()
  );

  if (!displayTitle) {
    res.status(404).json({
      response: `There is no title with this name`,
      success: false,
    });
  } else {
    res.status(200).json({
      response: displayTitle,
      success: true,
    });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
