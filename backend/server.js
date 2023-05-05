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
// Get all pokemons by default, name and legendary status by query
app.get("/pokemons", (req, res) => {
  const { name, legendary } = req.query;
  let pokemons = pokemonData;

  if (name) {
    pokemons = pokemonData.filter((singlePokemon) => {
      return singlePokemon.name.toLowerCase() === name.toLowerCase();
    })
  }

  if (legendary === 'true') {
    pokemons = pokemons.filter((singlePokemon) => {
      return singlePokemon.legendary === true;
    })
  } else if (legendary === 'false') {
    pokemons = pokemons.filter((singlePokemon) => {
      return singlePokemon.legendary === false;
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
// Filter by Type1
app.get("/type1/:type1", (req, res) => {
  const type1 = req.params.type1.toLowerCase()
  const filterByType1 = pokemonData.filter(item => item.type1.toLowerCase() === type1);

  if (type1) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        item: filterByType1
      }
    })
  } else {
    res.status(404).json({
      success: false,
      message: "Type not found",
      body: {}
    })
  }
})
// Filter by Type2
app.get("/type2/:type2", (req, res) => {
  const type2 = req.params.type2.toLowerCase()
  const filterByType2 = pokemonData.filter(item => item.type2.toLowerCase() === type2);

  if (type2) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        item: filterByType2
      }
    })
  } else {
    res.status(404).json({
      success: false,
      message: "Type not found",
      body: {}
    })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
