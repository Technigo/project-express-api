import express from "express";
import cors from "cors";
// adds swagger, used to document the API
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

import titles from "./data/netflix-titles.json";

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// function that creates pagination
const paginate = (res, page, limit, titlesToSend) => {
  let pageInt = parseInt(page);
  let limitInt = parseInt(limit);
  const next = pageInt + 1;
  const previous = pageInt - 1;
  const startIndex = (pageInt - 1) * limitInt;
  const endIndex = pageInt * limitInt;
  let nrPages = titlesToSend.length / limitInt;
  nrPages = Math.ceil(nrPages);
  const titlesToSendPage = titlesToSend.slice(startIndex, endIndex);

  if (previous === 0) {
    res.status(200).json({
      next: next,
      response: titlesToSendPage,
      success: true,
    });
  } else if (endIndex < titlesToSend.length) {
    res.status(200).json({
      next: next,
      previous: previous,
      response: titlesToSendPage,
      success: true,
    });
  } else {
    res.status(200).json({
      previous: nrPages,
      response: titlesToSendPage,
      success: true,
    });
  }
};

// function that takes in path-param, checks if it can find it and returns a proper status and response
const checkPathParam = (
  param,
  typeOfTitle,
  res,
  typeOfParam,
  page,
  limit
) => {
  let titlesWithParam = {};
  let errorResponse = "";
  if (typeOfParam === "id") {
    if (typeOfTitle === "Movie") {
      titlesWithParam = titles.find(
        (item) => item.show_id === +param && item.type === "Movie"
      );
      errorResponse = "there is no such movie";
    } else {
      titlesWithParam = titles.find(
        (item) => item.show_id === +param && item.type === "TV show"
      );
      errorResponse = "there is no such tv-show";
    }
  } else if (typeOfParam === "year") {
    if (typeOfTitle === "Movie") {
      titlesWithParam = titles.filter(
        (item) =>
          item.release_year === +param && item.type === "Movie"
      );
      errorResponse = `there are no movies from ${param}`;
    } else {
      titlesWithParam = titles.filter(
        (item) =>
          item.release_year === +param && item.type === "TV Show"
      );
      errorResponse = `there are no tv-shows from ${param}`;
    }
  }

  if (!titlesWithParam || titlesWithParam.length === 0) {
    res.status(404).json({
      response: errorResponse,
      success: false,
    });
  } else if (page && limit) {
    paginate(res, page, limit, titlesWithParam);
  } else {
    res.status(200).json({
      response: titlesWithParam,
      success: true,
    });
  }
};

app.get("/netflix-titles", (req, res) => {
  const { year, country, page, limit } = req.query;

  let titlesToSend = titles;

  if (year) {
    titlesToSend = titlesToSend.filter(
      (item) => item.release_year === +year
    );
  }
  if (country) {
    titlesToSend = titlesToSend.filter(
      (item) =>
        item.country.toLowerCase().indexOf(country.toLowerCase()) !==
        -1
    );
  }
  if (page && limit) {
    paginate(res, page, limit, titlesToSend);
  } else {
    res.status(200).json({
      response: titlesToSend,
      success: true,
    });
  }
});

app.get("/netflix-titles/movies", (req, res) => {
  const { page, limit } = req.query;
  let titlesToSend = titles.filter((title) => title.type === "Movie");
  if (page && limit) {
    paginate(res, page, limit, titlesToSend);
  } else {
    res.status(200).json({
      response: titlesToSend,
      success: true,
    });
  }
});

// the plus-sign before id says to convert it from string to number
app.get("/netflix-titles/movies/:id", (req, res) => {
  const { id } = req.params;
  checkPathParam(id, "Movie", res, "id");
});

app.get("/netflix-titles/movies/year/:year", (req, res) => {
  const { page, limit } = req.query;
  const year = req.params.year;
  checkPathParam(year, "Movie", res, "year", page, limit);
});

app.get("/netflix-titles/tv-shows", (req, res) => {
  const { page, limit } = req.query;
  let titlesToSend = titles.filter(
    (title) => title.type === "TV Show"
  );
  if (page && limit) {
    paginate(res, page, limit, titlesToSend);
  } else {
    res.status(200).json({
      response: titlesToSend,
      success: true,
    });
  }
});

app.get("/netflix-titles/tv-shows/:id", (req, res) => {
  const { id } = req.params;
  checkPathParam(id, "TV-show", res, "id");
});

app.get("/netflix-titles/tv-shows/year/:year", (req, res) => {
  const { page, limit } = req.query;
  const year = req.params.year;
  checkPathParam(year, "TV-show", res, "year", page, limit);
});

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("*", function (req, res) {
  res.status(404).json({
    response: "There is no such page",
    success: false,
  });
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
