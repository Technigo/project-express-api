import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
import data from './data/tarot-card.json'

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// START DEFINING YOUR ROUTES HERE
app.get("/", (req, res) => {
  res.send("Welcome to my first API");
});

// End-point with all tarot cards
app.get("/all-cards", (req, res) => {
  res.json(data.cards)
})

// End-point with all major arcana
app.get("/major-arcana", (req, res) => {
  const majorArcana = data.cards.filter((item) => item.arcana === "Major Arcana")
  res.json(majorArcana)
})

// End-point with all minor arcana
app.get("/minor-arcana", (req, res) => {
  const minorArcana = data.cards.filter((item) => item.arcana === "Minor Arcana")
  res.json(minorArcana)
})

// End-point with each suit: Cups, Swords, Wands, Pentacles, Trump
app.get("/suit/:suit", (req, res) => {
  const suit = req.params.suit
  const cardsFromSuit = data.cards.filter((item) => item.suit.toLowerCase() === suit.toLowerCase())
  res.json(cardsFromSuit)
})

// End-point with single tarot cards, filtered from each suit-list (because they don't have unique numbers(id))
app.get("/suit/:suit/:number", (req, res) => {
  const suit = req.params.suit
  const number = req.params.number
  const cardsFromSuit = data.cards.filter((item) => item.suit.toLowerCase() === suit.toLowerCase())
  const singleCard = cardsFromSuit.filter((item) => item.number === number)
  res.json(singleCard)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
