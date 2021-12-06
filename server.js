import express, { response } from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// define how many results per page
// const pagination = (pageNumber) => {
//   const pageSize = 10;
//   const startIndex = (pageNumber - 1) * pageSize;
//   const endIndex = startIndex + pageSize;
//   const itemsOnPage = netflixData.slice(startIndex, endIndex);

//   const returnObject = {
//     page_size: pageSize,
//     page: pageNumber,
//     num_of_pages: Math.ceil(netflixData.length / pageSize),
//     items_on_page: itemsOnPage.length,
//     results: itemsOnPage,
//   };
//   return returnObject;
// };

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(netflixData);
});

app.get("/year/:year", (req, res) => {
  const { year } = req.params;
  const { country, genre } = req.query;
  let contentOfYear = netflixData.filter((item) => item.release_year === +year);

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
    res.status(404).json("Not found");
  } else {
    res.json(contentOfYear);
  }
});

app.get("/type/:type", (req, res) => {
  const { type } = req.params;
  const { country, genre } = req.query;
  let typeOfContent = netflixData.filter((item) => item.type === type);

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
    res.status(404).send("Data not found");
  } else {
    res.json(typeOfContent);
  }
});

app.get("/titles/:title", (req, res) => {
  const { title } = req.params;
  const uniqueTitle = netflixData.find((item) => item.show_id === +title);

  if (!uniqueTitle) {
    res.status(404).send("Title not found");
  } else {
    res.json(uniqueTitle);
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
