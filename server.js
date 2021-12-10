import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import netflixData from "./data/netflix-titles.json";

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

// app.get("/netflix", (req, res) => {
//   res.json(netflixData);
// });

app.get("/", (req, res) => {
  const { title, release_year } = req.query;
  let netflixDataToSend = netflixData;

  // Gives the front-end the possibility to search for a movie title
  if (title) {
    netflixDataToSend = netflixDataToSend.filter(
      item => item.title.toLowerCase().indexOf(title.toLowerCase()) === 0
    );
  }

  // Gives the front-end the possibility to search for a release year
  if (release_year) {
    netflixDataToSend = netflixDataToSend.filter(
      item =>
        item.release_year.toString().indexOf(release_year.toString()) !== -1
    );
  }
  res.json(netflixDataToSend);
});

//   if (!movieTitle) {
//     res.status(404).send("No movie found with that name");
//   } else {
//     res.json(movieTitle);
//   }

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
