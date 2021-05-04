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
  res.json(data.slice(0, 100)); // on the homescreen 100 results shows
});

// slice depending on page query
const sliceData = (array, num, res) => {
  array = array.slice((num * 20), ((num + 1) * 20))
  return array.length < 1 ? res.send("Sorry, no more pages") : array;
}

// function for routing
const routes = (name, array) => {
  app.get(`/${name}/:${name}`, (req, res) => {
    const { countries, types, id, title } = req.params;
    const { year, genre, page } = req.query;

    /* filters data according to route name and params by comparing
    to the specific parameter in the json. upper case leters  and spaces are removed
    from the json to be able to match properly */
    array = data.filter((item) => {
      switch (name) {
        case "countries":
          return (item.country.toLowerCase().replace(/\s+/g, "") === countries);
        case "types":
          return (item.type.toLowerCase().replace(/\s+/g, "") === types);
        case "title":
          return (item.title.toString().toLowerCase().replace(/\s+/g, "") === title);
        default:
          return item.show_id === Number(id);
      }
    });

    if (year) {
      array = array.filter((item) => item.release_year === Number(year));
    }

    if (genre) {
      array = array.filter((item) => item.listed_in.toLowerCase().includes(genre));
    }

    if (page) {
      array = sliceData(array, Number(page), res) // user can see more results with query page
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
