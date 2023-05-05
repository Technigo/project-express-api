import express from "express";
import cors from "cors";


import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start


const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints');
// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(listEndpoints(app));
});
app.get('/titles', (req, res) => {
  res.json(netflixData)
  } )


app.get('/title/:id', (req, res) => {
  const { id } = req.params;
  const showId = netflixData.filter((title) => {
    return title.show_id === Number(id);
  });
  if (showId.length) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        title: showId
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "title not found",
      body: {}
    });
  }
});
app.get('/title/:title', (req, res) => {
  const { title } = req.params;
  const netflixTitle = netflixData.filter((item) => {
    return item.title.toLowerCase().includes(title.toLowerCase());
  });
  if (netflixTitle.length) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        title: netflixTitle
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "title not found",
      body: {}
    });
  }
});


app.get('/country/:country', (req, res) => {
  const { country } = req.params;
  const netflixCountry = netflixData.filter((item) => {
    return item.country.toLowerCase().includes(country.toLowerCase());
  });
  if (netflixCountry.length) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        title: netflixCountry
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "title not found",
      body: {}
    });
  }
});

app.get('/type/:type', (req, res) => {
  const { type } = req.params;
  const typeOfShow = netflixData.filter((item) => {
    return item.type.toLowerCase().includes(type.toLowerCase());
  });
  if (typeOfShow.length) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        title: typeOfShow
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "title not found",
      body: {}
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
