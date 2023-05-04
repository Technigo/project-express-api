import express, { response } from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
import netflixData from "./data/netflix-titles.json";
// console.log(netflixData.length)
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
  res.send("This is an api for netflix data");
  res.json(netflixData.endpoints.api)

});

// all releases by title, to return an array = http://localhost:8080/titles
app.get('/titles', (req, res) => {
  res.json(netflixData)
})

// finding one title by id, to return a single result
app.get('/titles/:show_id', (req, res) => {
  const { show_id } = req.params; // extracting from object, need {}
  console.log({ show_id });
  
  const singleTitle = netflixData.find((item) => {
    return item.show_id === Number(show_id);
  })
if (singleTitle) {
  res.status(200).json ({
    success: true,
    message: 'OK',
    body: {
      title: singleTitle
    }
  });
} else {
  res.status(404).json({
    success: false,
    message: 'Title not found',
    body: {}
  })
}
res.json(singleTitle) 
})


app.get('/type/:type', (req, res) => {
  const type = req.params.type.toLowerCase();
  const releaseYear = req.query.year;
  const country = req.query.country;
  console.log({ type })
  console.log(releaseYear)
  console.log({ country} )

  // filter by type of title, to return an array = https://localhost:8080/type/movie
  let typeOfTitle = netflixData.filter((item) => item.type.toLowerCase() === type)
  
  // filter by type of title and year, to return an array = http://localhost:8080/type/movie?year=2019
  if (releaseYear) {
    typeOfTitle = typeOfTitle.filter((item) => item.release_year === Number(releaseYear))
  }

  // filter by type of title and country, to return an array = http://localhost:8080/type/tv%20show?country=france
  if (country) {
    typeOfTitle = typeOfTitle.filter((item) => item.country.toLowerCase() === country )
  }
  
  res.json(typeOfTitle)
})

// Tried to create a dummy endpoint
// app.post('title', (req, res) => {
//   res.json({ message: 'title created successfully' });
// })

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// https://project-express-api-1z7o.onrender.com/