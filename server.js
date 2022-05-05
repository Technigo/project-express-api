import express from "express";
import cors from "cors";
import laureatesData from "./data/laureates.json";
import listEndpoints from "express-list-endpoints";

const port = process.env.PORT || 8081;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const Landing = {
    Welcome:
      "Hi! This is an open API for female Nobel Prize winners from 1901 to 2019",
    Routes: [
      {
        "/laureates": "Get laureates.",
        "/laureates/id/'number'": "Get laureates with matching id.",
        "/laureates?name='laureates name'":
          "Get laureates with matching titles.",
        "/laureates/?country='country'": "Get laureates by country.",
        "/endpoints": "Get API endpoints.",
      },
    ],
  };
  res.send(Landing);
});

// get list of female nobel laureates
app.get("/laureates"),
  (req, res) => {
    const { name, country, category } = req.query;

    let laureatesDataToSend = laureatesData;

    if (name) {
      laureatesDataToSend = laureatesDataToSend.filter(
        (item) => item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
      );
    }

    if (country) {
      laureatesDataToSend = laureatesData.filter(
        (item) =>
          item.country.toLowerCase().indexOf(country.toLowerCase()) !== -1
      );
    }

    if (category) {
      laureatesDataToSend = laureatesData.filter(
        (item) =>
          item.category.toLowerCase().indexOf(category.toLowerCase()) !== -1
      );
    }

    res.json({
      response: laureatesDataToSend,
      success: true,
    });
  };

app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app));
});

app.get("/laureates/id/:id", (req, res) => {
  const { id } = req.params;
  let showId = laureatesData.find((item) => item.id === +id);

  if (!showId) {
    res.status(404).send(`ID ${id} not found`);
  } else {
    res.json(showId);
  }
});

app.get("/laureates/name/:name", (req, res) => {
  const { name } = req.params;

  const laureateByName = laureatesData.find((item) => item.name === name);

  if (!laureateByName) {
    res.status(404).json({
      response: "Nobel laureate not found",
      success: false,
    });
  } else {
    res.status(200).json({
      response: laureateByName,
      success: true,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
