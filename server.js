import express from "express";
import cors from "cors";
import avocadoSales from "./data/avocado-sales.json";

const port = process.env.PORT || 8080;
const app = express();

// The cors() helps us to have both frontend and backend to be on the local host, without having errors.
// The express.json() helps us to read the bodies from the request as a json ( => no need for ex JSON.parse() or JSON.stringify() ).
app.use(cors());
app.use(express.json());

// --- START OF ROUTES ---

// Route 1: gets the base path with the "welcome" message.
app.get("/", (req, res) => {
  res.json({responseMessage: "Hello Avocado Sales Lover!"});
});

// Route 2: gets the sales endpoint. Shows an array of all the avocado sales elements from the json.
app.get("/sales", (req, response) => {
  const { date, averagePrice } = req.query;
  let sales = avocadoSales;

  // The toString() method converts the requested number into a string.
  if (averagePrice) {
    sales = sales.filter(singleAvocadoSale => singleAvocadoSale.averagePrice.toString() === averagePrice);
  }
  if (date) {
    sales = sales.filter(singleAvocadoSale => { return singleAvocadoSale.date.toString() === date});

  }

  response.status(200).json({
    success: true,
    message: "OK",
    body: {
      avocadoSales: sales
    }
  });
});

// Route 3: gets the sales id endpoint. Shows a single avocado sales element from the json.
app.get("/sales/:id", (request, response) => {
  const singleSale = avocadoSales.find((sale) => {
    // The Number() method converts the requested string to a number.
    return sale.id === Number(request.params.id);

  })
  if (singleSale) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        sale: singleSale
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Not Found",
      body: {}
    });
  }
  console.log(singleSale);
});

// --- END OF ROUTES ---

// To start the server.
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});