import express from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const movies = {
  Welcome: "Hi! This a Netflix Api",
  Routes: [{
    "/titles": "Get movie titles",
    "/titles/id/'number'": "Get movie titles with matching id",
    "titles/type/'choose Tv show or Movie'": "Get type of titles",
    "/titles?country='country name'": "Get movie titles from specific country.",
  }]
}
  res.send(movies);
});

// All titles
app.get("/titles", (req,res) => {
res.json(netflixData)
});

// Filter by country on the same router
app.get("/titles", (req,res) => {
  const { countries } = req.query
  let filteredCountry = []

  if (countries) {
       filteredCountry = netflixData.filter((movie) =>
       movie.country.toLocaleLowerCase()
        .includes(countries.toLocaleLowerCase())
    );
  }

 res.json(filteredCountry)
});

// Router for Id
app.get("/titles/:id", (req, res) => {
  const id = req.params.id
  const displayId = netflixData.find((movie) => movie.show_id === +id)

  if(!displayId) {
    res.status(404).send("Not Found")
  } else {
    res.status(200).send(displayId)
  }
});

//Router for Type
app.get("/titles/type/:type", (req, res) => {
  const type = req.params.type

  let filteredType = []

  if (type) {
      filteredType = netflixData.filter((movie) => movie.type
      .toLowerCase()
      .includes(type.toLocaleLowerCase())
  );
  }

  if(!filteredType) {
    res.status(404).send("Not Found")
  } else {
    res.status(200).send(filteredType)
  }

});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
