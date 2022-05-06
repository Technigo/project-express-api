import express from "express";
import cors from "cors";
import songs from "./data/top-music.json";

const port = process.env.PORT || 8080;
const app = express();

// Mddlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Defining rotes
app.get("/", (req, res) => {
  const Main = {
    About:
      "An API with 50 popular Spotify tracks and some data about the music type",
    Routes: [
      {
        "/api/songs": "Get all songs",
        "/api/genres/{genre}": "Get all songs in a specific genre",
        "/api/artists/{artist}": "Get songs from a specific artist",
        "/api/titles/{title}": "Get a song by its title name",
        "/api/ids/{number}": "Get a songs by its ID",
      },
    ],
  };
  res.send(Main);
});

app.get("/api/songs", (req, res) => {
  res.status(200).json(songs)
})

app.get("/api/genres/:genre", (req, res) => {
  const { genre } = req.params
  
  const songsByGenre = songs.filter(
    (songs) => songs.genre.toLowerCase() === genre.toLowerCase()
  );
  
  res.status(200).json({
    data: songsByGenre,
    success: true,
  });
});

app.get("/api/artists/:artist", (req, res) => {
  const { artist } = req.params
  
  const songsByArtist = songs.filter(
    (songs) => songs.artistName.toLowerCase() === artist.toLowerCase()
  );
  
  res.status(200).json({
    data: songsByArtist,
    success: true,
  });
});

app.get("/api/titles/:title", (req, res) => {
  const { title } = req.params
  const songByTitle = songs.find(
    (song) => song.trackName.toLowerCase() == title.toLowerCase()
  );

  if (!songByTitle) {
    res.status(400).json({
      data: "Not found",
      success: false,
    });
  } else {
    res.status(200).json({
      data: songByTitle,
      sucess: true,
    });
  }
});

app.get("/api/ids/:id", (req, res) => {
  const { id } = req.params;
  const songById = songs.find(
    (song) => song.id == id
  );

  if (!songById) {
    res.status(400).json({
      data: "Not found",
      success: false,
    });
  } else {
    res.status(200).json({
      data: songById,
      sucess: true,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
