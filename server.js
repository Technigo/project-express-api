import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import netflixData from "./data/netflix-titles.json";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// define how many results per page
const pagination = (data, pageNumber) => {
  const pageSize = 20;
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const itemsOnPage = data.slice(startIndex, endIndex);

  const returnObject = {
    page_size: pageSize,
    page: pageNumber,
    num_of_pages: Math.ceil(netflixData.length / pageSize),
    items_on_page: itemsOnPage.length,
    results: itemsOnPage,
  };
  return returnObject;
};

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(netflixData);
});

app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app));
});

app.get("/years/:year", (req, res) => {
  const { year } = req.params;
  const { country, genre, page } = req.query;
  let contentOfYear = netflixData.filter((item) => item.release_year === +year);

  // if (!contentOfYear) {
  //   res.status(404).json({
  //     response: "No year found",
  //     success: false,
  //   });
  // }
  if (country) {
    contentOfYear = contentOfYear.filter((item) =>
      item.country.toLocaleLowerCase().includes(country.toLocaleLowerCase())
    );
  }

  if (genre) {
    contentOfYear = contentOfYear.filter((item) =>
      item.listed_in.toLocaleLowerCase().includes(genre.toLocaleLowerCase())
    );
  }

  if (contentOfYear.length === 0) {
    res.json({
      response: "Data not found",
      success: true,
    });
  } else if (contentOfYear.length > 0 && contentOfYear.length < 20) {
    res.json({
      response: contentOfYear,
      success: true,
    });
  } else
    res.json({
      response: pagination(contentOfYear, page),
      success: true,
    });
});

app.get("/type/:type", (req, res) => {
  const { type } = req.params;
  const { country, genre, page } = req.query;
  let typeOfContent = netflixData.filter(
    (item) => item.type.toLocaleLowerCase() === type.toLocaleLowerCase()
  );

  if (type !== "Movie" || type !== "TV Show") {
    res.status(404).json({
      response: "No title found",
      success: false,
    });
  }
  if (country) {
    typeOfContent = typeOfContent.filter((item) =>
      item.country.toLocaleLowerCase().includes(country.toLocaleLowerCase())
    );
  }

  if (genre) {
    typeOfContent = typeOfContent.filter((item) =>
      item.listed_in.toLocaleLowerCase().includes(genre.toLocaleLowerCase())
    );
  }

  if (typeOfContent.length === 0) {
    res.json({
      response: "No data found",
      success: true,
    });
  } else if (typeOfContent.length > 0 && typeOfContent.length < 20) {
    res.json({
      response: typeOfContent,
      success: true,
    });
  } else
    res.json({
      response: pagination(typeOfContent, page),
      success: true,
    });
});

app.get("/titles/:id", (req, res) => {
  const { id } = req.params;
  const uniqueTitle = netflixData.find((item) => item.show_id === +id);

  if (!uniqueTitle) {
    res.status(404).json({
      response: "No title found",
      success: false,
    });
  } else {
    res.status(200).json({
      response: uniqueTitle,
      success: true,
    });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
