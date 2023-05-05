// netflixData is an API that allows to fetch data about movies and tv shows from Netflix
//
// * /titles
// accepts the following query params:
// type: data is filtered by type (movie, tv show etc)
// country: data is filtered by country
// year: data is filtered by release year
// * /titles/:show_id
// gets one specific title based on its id



// import express, { response } from "express";
import cors from "cors";
import { response } from "express";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
import netflixData from "./data/netflix-titles.json";
// console.log(netflixData.length)
// import topMusicData from "./data/top-music.json";

const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");

  const app = express();

  // Tried to use Swagger, may pick this up again in future 
  // const options = {
  //   definition: {
  //     openapi: "3.0.0",
  //     info: {
  //       title: "LogRocket Express API with Swagger",
  //       version: "0.1.0",
  //       description:
  //         "This is a simple CRUD API application made with Express and documented with Swagger",
  //       license: {
  //         name: "MIT",
  //         url: "https://spdx.org/licenses/MIT.html",
  //       },
  //       contact: {
  //         name: "LogRocket",
  //         url: "https://logrocket.com",
  //         email: "info@email.com",
  //       },
  //     },
  //     servers: [
  //       {
  //         url: "http://localhost:8080",
  //       },
  //     ],
  //   },
  //   apis: ["./routes/*.js"],
  // };
  
  // const specs = swaggerJsdoc(options);
  // app.use(
  //   "/api-docs",
  //   swaggerUi.serve,
  //   swaggerUi.setup(specs)
  // );

// START
// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
const listEndpoints = require("express-list-endpoints")

// Start defining your routes here
app.get("/", (req, res) => {
  // res.send("This is an api for netflix data");
  res.json(listEndpoints(app))
});


// all releases by title, to return an array = https://fiona-klacar-project-express-api.onrender.com/titles
app.get('/titles', (req, res) => {
  const type = req.query.type;
  const country = req.query.country;
  const year = req.query.year;

let titles = netflixData

// filter all titles by type of title, to return an array = https://fiona-klacar-project-express-api.onrender.com/titles?type=movie
if (type) {
  const typeWithoutSpaces = type.replace(/\s+/g, '');
  titles = titles.filter(singleNetlixDataPoint =>
    singleNetlixDataPoint.type.replace(/\s+/g, '').toLowerCase() === typeWithoutSpaces.toLowerCase()
  );
}

// filter all titles by type of country, to return an array = https://fiona-klacar-project-express-api.onrender.com/titles?country=france

if (country) {
  const countryWithoutSpaces = country.replace(/\s+/g, '');
  titles = titles.filter(singleNetflixDataPoint =>
    singleNetflixDataPoint.country.replace(/\s+/g, '').toLowerCase() === countryWithoutSpaces.toLowerCase()
  );
}

// filter all titles by year, to return an array = https://fiona-klacar-project-express-api.onrender.com/titles?year=2019


if (year) {
    titles= titles.filter(singleNetflixDataPoint => 
      singleNetflixDataPoint.release_year === Number(year))
  }

  if (titles.length === 0) {
    res.status(500).json({
      success: false,
      message: "Not found",
      body: {}
      })

    } else {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        netflixData: titles
  }
  });
 }
})

// filter by both type of title and country: http://localhost:8080/titles?type=tvshow&country=france

// finding one title by id, to return a single result = https://fiona-klacar-project-express-api.onrender.com/titles/81213894
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


// Dummy endpoint for POST request
app.post('/titles', (req, res) => {
  // Access the data from the request body
  const title = req.body;

  // Perform some action with the data
  // Log it to the console
  console.log(title);

  // Send a response
  res.send('New title data received');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


// https://regex101.com/ can try in future 

// ORIGINALLY DID THIS
// all releases by title, to return an array = https://fiona-klacar-project-express-api.onrender.com/titles
// app.get('/titles', (req, res) => {
//   res.json(netflixData)
// })

// finding one title by id, to return a single result
// app.get('/titles/:show_id', (req, res) => {
//   const { show_id } = req.params; // extracting from object, need {}
//   console.log({ show_id });
  
//   const singleTitle = netflixData.find((item) => {
//     return item.show_id === Number(show_id);
//   })
// if (singleTitle) {
//   res.status(200).json ({
//     success: true,
//     message: 'OK',
//     body: {
//       title: singleTitle
//     }
//   });
// } else {
//   res.status(404).json({
//     success: false,
//     message: 'Title not found',
//     body: {}
//   })
// }
// res.json(singleTitle) 
// })


// app.get('/type/:type', (req, res) => {
//   const type = req.params.type.toLowerCase();
//   const releaseYear = req.query.year;
//   const country = req.query.country;
//   console.log({ type })
//   console.log(releaseYear)
//   console.log({ country} )

  // filter by type of title, to return an array = https://fiona-klacar-project-express-api.onrender.com/type/movie
  // let typeOfTitle = netflixData.filter((item) => item.type.toLowerCase() === type)
  
  // filter by type of title and year, to return an array = https://fiona-klacar-project-express-api.onrender.com/type/movie?year=2019
  // if (releaseYear) {
  //   typeOfTitle = typeOfTitle.filter((item) => item.release_year === Number(releaseYear))
  // }

  // filter by type of title and country, to return an array = https://fiona-klacar-project-express-api.onrender.com/type/tv%20show?country=france
  // if (country) {
  //   typeOfTitle = typeOfTitle.filter((item) => item.country.toLowerCase() === country )
  // }
