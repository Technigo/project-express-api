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
        "/ramen/id/:id": "get ramen's id and return a single result",
        "/ramen/country/:country": "get list of all ramen from specific country",
        "/ramen/brand/:brand": "get list of all ramen with specific brand",
        "/ramen/style/:style": "get list of all ramen with specific type of serving",
        "/ramen/best": "get list of ramen from the highest rating to lowest rating"
      }],
      "Queries":[{
        "/ramen/country/:country?bad=true": "get list of ramen in a specific country that has less than 3 stars",
        "/ramen/country/:country?good=true": "get list of ramen in a specific country that has more than 4 stars"
      }]
  });
});


// Route to all ramen data
app.get("/ramen", (req, res) => {
  let ramenData = data
  res.status(200).json(ramenData)
})

// Route to ramen's id and return a single result
// example route: /ramen/id/2502
app.get("/ramen/id/:id", (req, res) => {
  const id = req.params.id
  let selectedId = data.find((item) => item.Id === +id)
  if (!selectedId){
    res.status(404).send({
      data: "ID not found",
      success: false 
    })
  } else {
    res.status(200).json({
      data: selectedId,
    success: true
  });
  }
});

// Route to ramen based on distribution between countries
// example route: /ramen/country/indonesia
// example route to good ramen: ramen/country/south%20korea?good=true
app.get("/ramen/country/:country", (req, res) => {
  const country = req.params.country
  const { bad, good } = req.query
  let selectedCountry = data.filter((item) => item.Country.toLowerCase() === country.toLowerCase())
  if(bad){
    selectedCountry = selectedCountry.filter((item) => item.Stars < 3)
  }
  if(good){
    selectedCountry = selectedCountry.filter((item) => item.Stars > 4)
  }

  res.status(200).json(selectedCountry);
});

// Route to ramen based on the brand name
// example route: /ramen/brand/indomie
app.get("/ramen/brand/:brand", (req, res) => {
  const brand = req.params.brand
  let selectedBrand = data.find((item) => item.Brand.toLowerCase() === brand.toLowerCase())
  
  if (!selectedBrand){
    res.status(404).send({
      data: "Brand not found",
      success: false 
    })
  } else {
    res.status(200).json({
      data: selectedBrand,
      success: true
    });
  } 
});


// Route to ramen based on how it is served
// example route: /ramen/style/cup
app.get("/ramen/style/:style", (req, res) => {
  const style = req.params.style
  let selectedStyle = data.find((item) => item.Style.toLowerCase() === style.toLowerCase())
  
  if (!selectedStyle){
    res.status(404).send({
      data: "Style not found",
      success: false 
    })
  } else {
    res.status(200).json({
      data: selectedStyle,
    success: true
  });
  }
});


// Route to sort ramen from best rating to lowest
// example route: /ramen/best
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
