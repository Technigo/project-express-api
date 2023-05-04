import express from "express";
import cors from "cors";
import pokemonData from "./data/csvjson.json"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints')

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(listEndpoints(app))
});
// Get all pokemons + query name
app.get("/pokemons", (req, res) => {
  const { name } = req.query;
  let pokemons = pokemonData;

  if (name) {
    pokemons = pokemonData.filter((singlePokemon) => {
      return singlePokemon.name.toLowerCase() === name.toLowerCase();
    })
  }

  if (pokemons) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        pokemonData: pokemons
      }
    })
  } else {
    res.status(500).json({
      success: false,
      message: "Error",
      body: {}
    })
  }
})
// Get single pokemon by id
app.get("/pokemons/:id", (req, res) => {
  const singlePokemon = pokemonData.find((pokemon) => {
    return pokemon.id === Number(req.params.id)
  });
  if (singlePokemon) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        pokemon: singlePokemon
      }
    })
  } else {
    res.status(404).json({
      success: false,
      message: "Pokemon not found",
      body: {}
    })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
