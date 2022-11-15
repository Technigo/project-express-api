import express from "express";
import cors from "cors";
import data from "./data/ramen.json"

// I am using another database I found on Kaggle.com which is a data about instant ramen products


// Defines the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT || 8080;
const app = express();


// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


// Start defining your routes here
app.get("/", (req, res) => {
  res.send({
    "World of Instant Ramen": "Because Ramen safes your busy life",
      "Routes":[{
        "/ramen": "get list of all ramen",
        "/ramen/country/:country": "get list of all ramen from specific country",
        "/ramen/brand/:brand": "get list of all ramen with specific brand",
        "/ramen/style/:style": "get list of all ramen with specific type of serving",
        "/ramen/best": "get list of ramen from the highest rating to lowest rating"
      }]
  });
});


// Route to all ramen data
app.get("/ramen", (req, res) => {

  res.json(data)
})


// Route to ramen based on distribution between countries
app.get("/ramen/country/:country", (req, res) => {
  const country = req.params.country
  let selectedCountry = data.filter((item) => item.Country.toLowerCase() === country.toLowerCase())
  
  res.status(200).json(selectedCountry);
});


// Route to ramen based on the brand name
app.get("/ramen/brand/:brand", (req, res) => {
  const brand = req.params.brand
  let selectedBrand = data.filter((item) => item.Brand.toLowerCase() === brand.toLowerCase())
  
  res.status(200).json(selectedBrand);
});


// Route to ramen based on how it is served
app.get("/ramen/style/:style", (req, res) => {
  const style = req.params.style
  let selectedStyle = data.filter((item) => item.Style.toLowerCase() === style.toLowerCase())
  
  res.status(200).json(selectedStyle);
});


// Route to sort ramen from best rating to lowest
app.get("/ramen/best", (req, res) => {
  const best = data.sort(
    (a, b) => b.Stars - a.Stars
  )

  res.status(200).json(best)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
