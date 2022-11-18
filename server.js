import express, { request } from "express"; // to create api
import cors from "cors"; //cors- To have request from same origin. Frontend and backend can both work from localhost
import netflixData from "./data/netflix-titles.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:

// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json()); //Allows us to read the body from the request as a json

// Start defining your routes here
app.get("/", (req, res) => {
  const navigation = {
    guide: "Routes for this netflix API!",
    Endpoints: [
      {
        "/netflix": "Display all netflix data",
        "/netflix/:id": "Dislay a serie/movie with a specific id",
        "/netflix/type/:type": "Choose to display Movie or TV Show",
        
        "/netflix?title=   ": "Add title to search for tv-show/movie",
        "/netflix?actor=   ": "Add name of an actor to search for tv-show/movie",
        "/netflix?director=   ": "Add name of a director to search for tv-show/movie",
        "/netflix?country=   ": "Add a country to search for tv-show/movie",
      },
    ],
  };
  res.send(navigation);
});

app.get("/netflix", (req, res) => {
  const { title, actor, director, country, description } = req.query;
  let netflix = netflixData;

  if (title) {
    netflix = netflix.filter(item => item.title.toLowerCase() === (title.toLowerCase())
    )
  }

  if (actor) {
    netflix = netflix.filter(item => item.cast.toLowerCase().includes(actor.toLowerCase())
    )
  }

  if (director) {
    netflix = netflix.filter(item => item.director.toLowerCase().includes(director.toLowerCase())
    )
  }

 if (country) {
    netflix = netflix.filter(item => item.country.toLowerCase().includes(country.toLowerCase())
    )
  }

   if (description) {
    netflix = netflix.filter(item => item.description.toLowerCase().includes(description.toLowerCase())
    )
  }
  if (netflix.length === 0) {
  res.status(404).json({
    success: false,
    message: "Not found, try again with different query",
    body: {}
  })
  } else {
  res.status(200).json({
    success: true,
    message: "OK",
    body: {
    netflixData: netflix
    }
  })
  }
});

// id
app.get("/netflix/:id", (req, res) => {
  const singelNetflix = netflixData.find((item) => {
    return item.show_id === +req.params.id
  })
  if (singelNetflix) {
  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      netflixData: singelNetflix
    }
  })
  } else {
  res.status(404).json({
    success: false,
    message: "No shows or series found, please try a different id",
    body: {}
  })
  }
});

// type
app.get("/netflix/type/:type", (req, res) => {
  const { type } = req.params;
  let typeOfNetflix = netflixData;

  if (type) {
    typeOfNetflix = typeOfNetflix.filter(item => item.type.toLowerCase().includes(type.toLowerCase()))
  }

  if (typeOfNetflix) {
  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      netflixData: typeOfNetflix
    }
  })
  } else {
  res.status(404).json({
    success: false,
    message: "No shows or series found, please choose between tv show or serie ",
    body: {}
  })
  }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
