import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import traktamente from "./data/traktamente-en.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 9000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// API Documentation
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);

  res.send({
    message: "This API is made to search Utlandstraktamenten(allowance abroad) since 2023 based on the Swedish Tax Agency's general advice.",
    description: "Traktamenten is a Swedish word which related to the allowance on the increased living expenses abroad for business trips, temporary work and dual residence.",
    endpoints: endpoints,
    explaination: {
      "/traktamente": "Get all data of countries, allowance and year",
      "/traktamente?year=2024": "Get all data of countries and allowance in year 2024",
      "/traktamente?country=USA": "Get allowance of USA in year 2023 and 2024",
      "/traktamente?country=USA&year=2024":"Only get allowance of USA in year 2024"
    }
  });
});

app.get("/traktamente", (req, res) => {
  const { country, year } = req.query;

  let filteredTraktamente = traktamente;

  if (country) {
    filteredTraktamente = filteredTraktamente.filter(
      item => item["country or territory"].toLowerCase().includes(country.toLowerCase())
    );
  }

  if (year) {
    filteredTraktamente = filteredTraktamente.filter(
      item => item.year === year
    );
  }  

  if (filteredTraktamente.length > 0) {
    res.json(filteredTraktamente)
  } else {
    res.status(404).send("Bad request! No data found.")
  };
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

