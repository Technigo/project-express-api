import express from "express";
import cors from "cors";
/* import techingomembers from "./data/technigo-members.json" */
import netflixData from "./data/netflix-titles.json";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";

// import topMusicData from "./data/top-music.json";

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
  res.status(200).json({ resMessage: "Netflix titles" });
});

app.get("/movies", (req, res) => {
  res.status(200).json({ netflixData: netflixData });
});

app.get("/movies/year/:release_year", (req, res) => {
  const allMoviesByYear = netflixData.filter((movie) => {
    return movie.release_year === +req.params.release_year;
  });
  res.status(200).json({ allMoviesByYear })
});

app.get("/movies/title/:title", (req, res) => {
  const singleMovieByTitle = netflixData.find((movie) => {
    return movie.title === req.params.title;
  });
  res.status(200).json({ singleMovieByTitle })
});

app.get("/movies/type/:type", (req, res) => {
  const singleMovieByType = netflixData.filter((movie) => {
    return movie.type === req.params.type;
  })
  res.status(200).json({ singleMovieByType })
})

app.get("/movies/director/:director", (req, res) => {
  const moviesByDirector = netflixData.filter((movie) => {
    return movie.director === req.params.director;
  })
  res.status(200).json({ moviesByDirector })
})

// app.get("/", (req, res) => {
//   res.status(200).json({ responseMessage: "Hello Technigo!" });
// });

// app.get("/members", (req, res) => {
//   res.status(200).json({ techingomembers: techingomembers })
// })
// app.get("/members/:id", (req, res) => {
//   const singleMember = techingomembers.find((member) => {
//     return member.id === +req.params.id;
//     // return member.id === Number(req.params.id)
//     // return member.id.toString() === req.params.id;
//     // return member.id == request.params.id;
//   })
//   res.status(200).json(singleMember);
// })

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
