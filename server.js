import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import data from "./data/netflix-titles.json";

//I've left all coments so that I can go back to this project and read them if necessary in the future.

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

const listEndpoints = require("express-list-endpoints");

app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

app.get("/content/:id", (req, res) => {
  // Displays object with specific ID
  const id = req.params.id;
  const contentWithId = data.filter((item) => item.show_id === +id);

  res.json(contentWithId);
});

app.get("/content/", (req, res) => {
  // Sorts based on queries
  const { page, actor, type, title, year, country, director } = req.query;
  let dataList = data;

  if (actor) {
    dataList = dataList.filter((item) =>
      item.cast.toLowerCase().includes(actor.toLowerCase())
    );
  }
  if (type) {
    dataList = dataList.filter((item) =>
      item.type.toLowerCase().includes(type.toLowerCase())
    );
  }
  if (title) {
    dataList = dataList.filter((item) =>
      item.title.toString().toLowerCase().includes(title.toLowerCase())
    );
  }

  if (year) {
    dataList = dataList.filter((item) =>
      item.release_year.toString().toLowerCase().includes(year.toLowerCase())
    );
  }

  if (country) {
    dataList = dataList.filter((item) =>
      item.country.toString().toLowerCase().includes(country.toLowerCase())
    );
  }

  if (director) {
    dataList = dataList.filter((item) =>
      item.director.toString().toLowerCase().includes(director.toLowerCase())
    );
  }

  //I'm still a bit lost on this, will re-watch the code-a-long from today

  const startIndex = 10 * (+page - 1) || 0;
  const endIndex = startIndex + 10;
  const dataListPaginated = dataList.slice(startIndex, endIndex);

  if (dataListPaginated.length === 0) {
    res.status(404).json({
      error: "No shows or series found, please try a different query",
    });
  }

  res.json({ content: dataListPaginated });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
