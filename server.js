import express from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";
import listEndpoints from "express-list-endpoints";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app))
});

app.get("/", (req, res) => {
  const movies = {
    Welcome: "Hi! This a Netflix Api",
    Routes: [{
      "/titles": "Get movie or tv show titles.",
      "/titles/id/'number'": "Get movie or tv show titles with matching id.",
      "titles/type/'tv show or movie'": "Get type of titles.",
      "/titles?country='country name'": "Get movie or tv show titles from specific country.",
      "/titles?releaseYear='year'": "Get release year of the title.",
      "/titles?releaseYear='year'&country='country'": "Get release year and country of the title.",
      "/endpoints": "Get API endpoints."
    }]
  }
  res.send(movies);
});


app.get("/titles", (req, res) => {
  const { country, releaseYear } = req.query
  let filteredData = netflixData

  if (country) {
    filteredData = netflixData.filter((movie) =>
      movie.country.toLocaleLowerCase()
        .includes(country.toLocaleLowerCase())
    )
  }

  if (releaseYear) {
    filteredData = netflixData.filter((movie) =>
      movie.release_year == parseInt(releaseYear)
    )
  }

  if (country && releaseYear) {
    filteredData = netflixData.filter((movie) =>
      movie.release_year == parseInt(releaseYear) &&
      movie.country.toLocaleLowerCase()
        .includes(country.toLocaleLowerCase())
    )
  }

  res.status(200).json({
    response: filteredData,
    message: "Ok",
    success: true,
  })

});


app.get("/titles/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const displayId = netflixData.find((movie) => movie.show_id === id)

  if (!displayId) {
    res.status(404).send("Not Found")
  } else {
    res.status(200).send(displayId)
  }
});


app.get("/titles/type/:type", (req, res) => {
  const type = req.params.type
  const filteredType = netflixData.filter((movie) => movie.type
      .toLowerCase()
      .includes(type.toLocaleLowerCase())
    );

  if (!filteredType) {
    res.status(404).send("Not Found")
  } else {
    res.status(200).send(filteredType)
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
