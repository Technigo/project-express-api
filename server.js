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

app.get("/Netflix", (req, res) => {
  res.json(data);
});

// function for routing
const routes = (name, array) => {
  app.get(`/${name}/:${name}`, (req, res) => {
    const { country, type, id, title } = req.params;
    const { year, genre } = req.query;
    const paramsArray = [
      { name: "type", value: type },
      { name: "country", value: country },
      { name: "title", value: title },
      { name: "show_id", value: id }
    ];

    /* filters data according to route name and params by comparing
    to the specific parameter in the json. upper case leters  and spaces are removed
    from the json to be able to match properly */
    // eslint-disable-next-line array-callback-return
    array = data.filter((item) => {
      for (let i = 0; i < paramsArray.length; i += 1) {
        if (name !== "id") {
          return (
            item[paramsArray[i].name].toString().toLowerCase().replaceAll(/ /g, "") 
            === paramsArray[i].value
          );
        } return item[paramsArray[i].name] === Number(paramsArray[i].value);
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
routes("country", netflixByCountry);
routes("type", netflixByType);
routes("id", netflixById);
routes("title", netflixByTitle);

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
