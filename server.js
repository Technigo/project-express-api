import express from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express(); //this function call will allows us to create the whole API boilerplate

// Add middlewares to enable cors and json body parsing
// Cors makes it easier to use the API, allows API's to say where the requests come from.
// bodyParser allows express to read json in post requests
app.use(cors());
app.use(express.json()); //allows us to read the bodies from the request

// Start defining your routes here
app.get("/", (req, res) => {

  res.send({responseMessage: "Hello! An API for netflix-titles."});
});

app.get("/shows", (req, res) => {
  const { title, country, year, type } = req.query;
  
  let totalShows = [...netflixData]; // Clone
  // let totalShows = netflixData; Share the same memory adress
  
  if (title) {
    totalShows = totalShows.filter((show) => show.title.toLowerCase() === title.toLowerCase())
  }
  if (country) {
    totalShows = totalShows.filter((show) => show.country.toLowerCase() === country.toLowerCase())
  }
  if (year) {
    totalShows = totalShows.filter((show) => show.year.toLowerCase() === year.toLowerCase())
  }
  if (type) {
    totalShows = totalShows.filter((show) => show.type.toLowerCase() === type.toLowerCase())
  }

  res.status(200).json({ 
    success: true,
    message: "OK",
    response: {
      netflixData: totalShows
    }
  });
});


app.get("/shows/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  // const singleShowByID = netflixData.find((totalShows) => totalShows.id === Number(request.params.id));
  const singleShowByID = netflixData.find(({show_id}) => show_id === Number(id));
  console.log(JSON.stringify(singleShowByID));

    if (singleShowByID) {
      res.status(200).json({
      success: true,
      message: "OK",
      response: {
        totalShows: singleShowByID
      }
  })
} else {
  res.status(404).json({ 
    success: false,
    message: `Not Found with id number ${id}`,
    response: {}
});
}
console.log(singleShowByID)
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
