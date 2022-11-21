import express, { response } from "express";
import cors from "cors";
import avocadoSalesData from "./data/avocado-sales.json";

// console.log(`Langden anna: ${avocadoSalesData.length}`)

// Defines the port the app will run on. 
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Showing on first page
app.get("/", (req, res) => {
  // console.log("res", req);
  res.json({responseMessage: "Avocados!"});
});

// This route returns the whole dataset
app.get("/avocadoSales", (req, res) => {
  res.json(avocadoSalesData)
});

// This route returns an array with all sales objects for a specific date
app.get("/avocadoSales/:date", (req, res) => {

  // gets the date from the url
  const date = req.params.date;

  // filters the data and only showing sales for right date
  const dateSale = avocadoSalesData.filter((item) => item.date === date)

  // if the length of the array is 0, there is no data for that date and 
  // an error message shows
  if (dateSale.length === 0) {
    res.status(404).json({
      success: false, 
      message: "Sorry, no sales data for that date.", 
      body: {}
    });
  } else {
    res.status(200).json({
      success: true, 
      message: "OK", 
      body: {
        avocadoSalesData: dateSale
      }
    });
  };
});

// this returns the highest average price 
app.get("/highestPrice", (req, res) => {
  let price = []
  avocadoSalesData.map((p) => { return price.push(p.averagePrice)})
  price.sort((a, b) => b - a)

  res.status(200).json({
    success: true, 
    message: "OK", 
    body: {
      "Highest average price": price[0]
    }
  });
});

// this sorts the whole list by average price, it does the same (sorting) as the one above,
// but with a more neat code and presenting the whole array instead of one number. Learnt from classmates during demo! 
app.get("/mostExpensive", (req, res) => {
  const pricy = avocadoSalesData.sort((a, b) => b.averagePrice - a.averagePrice)

  res.status(200).json(pricy)
});

// returns a single result 
app.get("/avocados/:id", (req, res) => {
  const singleAvocadoSale = avocadoSalesData.find((i) => i.id === Number(req.params.id)
  )

  if (singleAvocadoSale) {
    res.status(200).json({
      success: true,
      message: "OK", 
      body: {
        AvocadoSale: singleAvocadoSale
      }
    })
  } else {
    res.status(404).json({
      success: false, 
      message: "No id found", 
      body: {}
    });
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
