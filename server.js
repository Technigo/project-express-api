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

// function for routing
const routes = (name, array) => {
  app.get(`/${name}/:${name}`, (req, res) => {
    const { countries, types, id, title } = req.params;
    const { year, genre } = req.query;

    /* filters data according to route name and params by comparing
    to the specific parameter in the json. upper case leters  and spaces are removed
    from the json to be able to match properly */
    array = data.filter((item) => {
      switch (name) {
        case "countries":
          return (
            item.country.toLowerCase().replace(/\s+/g, "") === countries
          );
        case "types":
          return (
            item.type.toLowerCase().replace(/\s+/g, "") === types
          );
        case "title":
          return (
            item.title.toString().toLowerCase().replace(/\s+/g, "") === title
          );
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

    // if no data is returned from filtering (no match with params/query) a message says so
    if (array.length === 0) {
      res.send(`
        Sorry, no titles exist for this category 
        ${year ? `from year ${year}` : ""} 
        ${genre ? `in the genre ${genre}` : ""}
      `);
    } else {
      res.json(array);
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
