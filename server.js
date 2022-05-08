//Need to import the dependencies (like in React)
import express from "express";
import cors from "cors";

import netflix from "./data/netflix-titles.json";

// import avocadoSalesData from "./data/avocado-sales.json";
//import books from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import topMusicData from "./data/top-music.json";
//import members from "./data/technigo-members.json"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
//Row 18 where we initialise our code, and every row after starts with app.
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing and is setup code, will not do anything to it
//First line tells that orogins/request are accepted by our backend. Empty () will accept all requests.
//The second line is the unpacking of the json, and its enough with this line of code for that 
//When data come from frontend to back end we need to unpack it, just like we do on the frontend from the backend
//But in the backend we don't have to do it in every request, like in the frontend.
app.use(cors());
app.use(express.json());


// Start defining your routes here (first example of the endpoint)
app.get("/", (req, res) => {
  const endpoints = {
    Welcome: "Hi! This is an open API fpr Netflix titles",
    Routes: [
      {
        "/netflix" : "Get an array of all Netflix content",
        "/netflix/shows" : "Gives an array of all TV shows",
        "/netflix/movies": "Gives an array of all movies",
        "/netflix/directors/:director": "Get movies/TV shows by directors",
        "/netflix/genres/:listed_in": "Get movies/TV shows based on genres",
        "/netflix/titles/:title" : "Get movie/TV show by title",
        "/netflix/ids/:show_id": "Get a movie/TV show by id"
      },
    ],
  }
  res.send(endpoints)
});

app.get("/netflix", (req, res) => {
  const { director, title } = req.query

  let result = netflix

  //result can be used again for filtering title
  if(director) {
    result = result.filter((item) => 
    item.director.toLowerCase().includes(director.toLowerCase()))
  }

  if(title) {
    result = result.filter((item) => 
    item.title.toLowerCase().includes(title.toLowerCase()))
  }

  if(result.length === 0) {
    res.status(404).json({
      data: 'Could not find a match',
      success: false
    })
  }else {
    res.status(200).json({
      data: result,
      success: true
    })
  }
})

app.get("/netflix/shows", (req, res) => {
  const netflixType = netflix.filter((item) => item.type === "TV Show")
  res.status(200).json(netflixType)
})

app.get("/netflix/movies", (req, res) => {
  const netflixType = netflix.filter((item) => item.type === "Movie")
  res.status(200).json(netflixType)
})

app.get("/netflix/directors/:director", (req, res) => {
  const { director } = req.params
  const netflixByDirector = netflix.filter((item) => item.director.toLowerCase().includes(director.toLowerCase()))
    res.status(200).json({
      data: netflixByDirector, 
      success: true
    })
  })

app.get("/netflix/genres/:listed_in", (req,res) => {
  const { listed_in } = req.params
  const netflixByGenre = netflix.filter((item) => item.listed_in.toLowerCase().includes(listed_in.toLowerCase()))
  res.status(200).json(netflixByGenre)
})

app.get("/netflix/titles/:title", (req, res) => {
  const { title } = req.params

  const netflixByTitle = netflix.find((item) => item.title.toLowerCase() === title.toLowerCase())
  
  if(!netflixByTitle){
    res.status(404).json({
      data: "No title found with that name",
      success: false,
    })
  } else {
    res.status(200).json({
      data: netflixByTitle,
      success: true,
    })
  }
})

app.get("/netflix/ids/:show_id", (req, res) => {
  
  const netflixById =  netflix.find((item) => +item.show_id === +req.params.show_id )
  if (!netflixById) {
    res.status(404).json({
      data: `Sorry, can't find a match for ${req.params.show_id }`,
      success: false,
    })
  } else {
    res.status(200).json({
      data: netflixById,
      success: true
    })
  }
})



//Empty endpoints
//app.get("/netflix/getsuggestions", (req, res) => {

  // Get movie suggestions, look up what users friends are watching and return a subset of those.
  //res.status(200).json("Your friends are looking at this right now")
//})


// Start the server and is a confirmation that everything is up and running
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})
