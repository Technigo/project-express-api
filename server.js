/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import express, { request } from "express";

import artistsList from "./data/artists.json";

const port = process.env.PORT || 8080;
const app = express();

const publicDir = require("path").join(__dirname, "/public/resized");

app.use("/image-directory", express.static(publicDir));

// Endpoint to get all the artist
app.get("/artists", (request, response) => {
  response.json(artistsList);
});

// Endpoint with filters/ parameters
app.get("/artists/:nationality/:genre", (request, response) => {
  const { nationality } = request.params;
  const { genre } = request.params;

  if (nationality !== "all") {
    const artistFilter = artistsList.filter(
      (artist) => artist.nationality.toLowerCase() === nationality.toLowerCase()
    );

    if (genre !== "all") {
      response.json(
        artistFilter.filter((artist) =>
          artist.genre.toLowerCase().startsWith(genre.toLowerCase())
        )
      );
    } else {
      response.json(artistFilter);
    }
  } else if (genre) {
    const newGenre = genre.replace("-", " ");
    response.json(
      artistsList.filter((artist) =>
        artist.genre.toLowerCase().startsWith(newGenre.toLowerCase())
      )
    );
  }
});

// Endpoint to get specific artist detail
app.get("/artists/:id", (request, response) => {
  const { id } = request.params;
  const artistDetail = artistsList.find((artist) => artist.id === +id);
  response.json(artistDetail || response.status(404));
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
