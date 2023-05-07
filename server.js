import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
import gotQuotesData from "./data/got-quotes.json"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/quotes", (req, res) => {
  res.json(gotQuotesData);
});

app.get('/character/:name', (req, res) => {
  const name = req.params.name
  const quotesFromCharacter  = gotQuotesData.filter((item) => item.character.slug === name)

  if (quotesFromCharacter.length === 0) {
    // If no quotes were found for the specified character name,
    // return an error response with a 404 status code.
    res.status(404).json({ error: `No character found with name "${name}"` })
  } else {
    // If quotes were found, return the quotes for the character.
    res.json(quotesFromCharacter)
  }
})

app.get('/house/:house', (req, res) => {
  const house = req.params.house
  const showName = req.query.name

  let quotesFromHouse = gotQuotesData.filter((item) => item.character.house.slug === house)

  if (showName) {
    quotesFromHouse = quotesFromHouse.filter((item) => item.character.slug === showName)
  }

  res.json(quotesFromHouse)
})

// in browser, write for example '/house/lannister?name=cersei'

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
