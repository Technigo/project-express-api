import express from "express";
import cors from "cors";
import netflixShows from "./data/netflix-titles.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello frontend developer!");
});

//all the movies and TV shows
app.get("/netflixShows", (req, res) => {
res.status(200).json({
data: netflixShows,
success: true,
});
});

//director
app.get("/netflixShows/director/:director", (req, res) => {
  const { director } = req.params

  const showByDirector = netflixShows.filter(
    (show) => show.director.toLowerCase().includes(director.toLowerCase())
    )
  
  res.status(200).json({
    data: showByDirector,
    success: true,
  })
})

//cast
  app.get("/netflixShows/cast/:cast", (req, res) => {
    const { cast } = req.params
  
     const showByCast = netflixShows.filter(
        (show) => show.cast.toLowerCase().includes(cast.toLowerCase())
     )
  
      res.status(200).json({
        data: showByCast,
        success: true,
      })
  })

//country 
app.get("/netflixShows/country/:country", (req, res) => {
  const { country } = req.params

  const showByCountry = netflixShows.filter(
    (show) => show.country.toLowerCase().includes(country.toLowerCase())
    )
  
  res.status(200).json({
    data: showByCountry,
    success: true,
  })
})

//release year
app.get("/netflixShows/release_year/:release_year", (req, res) => {
  const { release_year } = req.params

  const showByReleaseYear = netflixShows.filter(
    (show) => show.release_year.toString() === release_year.toString()
    )
  
  res.status(200).json({
    data: showByReleaseYear,
    success: true,
  })
})

//title
app.get("/netflixShows/title/:title", (req, res) => {
const { title } = req.params

const showByTitle = netflixShows.filter(
  (show) => show.title.toLowerCase().includes(title.toLowerCase())
  )

  // since title is unique 404 is used
  if (!showByTitle) {
    res.status(404).json({
      data:"Not Found",
      success: false,
    })
  } else {
    res.status(200).json({
      data:showByTitle,
      success:true,
    })
  }
})

//listed in, category
app.get("/netflixShows/listed_in/:listed_in", (req, res) => {
  const { listed_in } = req.params

  const showByListedIn = netflixShows.filter(
    (show) => show.listed_in.toLowerCase().includes(listed_in.toLowerCase())
    )

    res.status(200).json({
      data: showByListedIn,
      success: true,
    })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
