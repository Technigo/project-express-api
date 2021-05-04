import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import data from "./data/netflix-titles.json";

const port = process.env.PORT || 8080;
const app = express();

let netflixByCountry;
let netflixByType;
let netflixById;
let netflixByTitle;

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json(data);
});

// slice depending on page query (20 results per page)
const sliceData = (array, num, res) => {
  array = array.slice(num * 20, (num + 1) * 20);
  return array.length < 1 ? res.send("Sorry, no more pages") : array;
};

// function for routing
const routes = (names, array) => {
  app.get(`/${names}/:${names}`, (req, res) => {
    const { countries, types, id, title } = req.params;
    const { year, genre, page } = req.query;
    const paramArr = [
      { name: "", value: "" },
      { name: "country", value: countries },
      { name: "type", value: types },
      { name: "show_id", value: id },
      { name: "title", value: title }
    ];
    let i = 0;

    /* filters data according to route name and params by comparing to the specific parameter in the
    json. From the json data spaces and uppercases are removed to be able to match with params */
    array = data.filter((item) => {
      // eslint-disable-next-line no-unused-expressions
      i < 4 ? i += 1 : i = 1; // for iterating the paramArr
      return (
        item[paramArr[i].name].toString().toLowerCase().replace(/\s+/g, "")
         === paramArr[i].value.toLowerCase()
      );
    });

    if (year) {
      array = array.filter((item) => item.release_year === Number(year));
    }

    if (genre) {
      array = array.filter((item) => item.listed_in.toLowerCase().includes(genre));
    }

    if (page) {
      array = sliceData(array, Number(page), res); // user can see more results with query page
    }

    // if no data is returned from filtering (no match with params/query) a message says so
    if (array.length === 0) {
      res.send(`
        Sorry, no more titles exist for this category 
        ${year ? `from year ${year}` : ""} 
        ${genre ? `in the genre ${genre}` : ""}
      `);
    } else {
      res.json(array.slice(0, 19)); // so result always is max 20 objects
    }
  });
};

// execute routing function with specific arguments
routes("countries", netflixByCountry);
routes("types", netflixByType);
routes("id", netflixById);
routes("title", netflixByTitle);

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
