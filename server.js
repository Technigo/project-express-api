import express from "express";
import cors from "cors";
import avocadoSales from "./data/avocado-sales.json";
// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
// The cors helps us to have both frontend and backend
// to be on the local host, without having errors.
app.use(cors());
//Allows us to read the bodies from the request as a json
app.use(express.json());

// Start defining your routes here
// This is the first Get request
//The path is the slash. Is the base path in this case.
// req = request, res = result
app.get("/", (req, res) => {
  //console.log("req", req);
  //console.log("res", res);
  //res.send({responseMessage: "Hello Technigo!"});
  res.json({responseMessage: "Hello Avocado Sales Lover!"});
});
//HTMLElement.addEventListener('nameOfTheListener', () => {

//});
// http://localhost:8080/members?role=Code coach
// in the browser, the blank space is represented by %20
// syntax for the query parameters:
// ?paramname=paramvalue&anotherparamname=anotherparamvalue
// apply the query parameter name by using the questionmark: ?
// query parameters = after the ?
// apply the query parameter value by using the equal sign: =
// parameters value = after the =
app.get("/sales", (req, response) => {
  const { date, averagePrice } = req.query;
  let sales = avocadoSales;

  if (averagePrice) {
    // http://localhost:8080/members?role=code coach
    // members = technigoMembers.filter(singleTechnigoMember => { return singleTechnigoMember.role === role})
    sales = sales.filter(singleAvocadoSale => singleAvocadoSale.averagePrice.toString() === averagePrice);
  }
  if (date) {
    // several parameter names => use the ampersant: &
    // http://localhost:8080/members?role=Code coach&name=matilda
    // sales = sales.filter(singleAvocadoSale => { return singleAvocadoSale.date.toLowerCase() === date.toLowerCase()});
    sales = sales.filter(singleAvocadoSale => { return singleAvocadoSale.date.toString() === date});

  }

    // important that the 3rd property is the same in your responses
    // have the same structure. 3rd on our case: body
  response.status(200).json({
    success: true,
    message: "OK",
    body: {
      avocadoSales: sales
    }
  });
});

app.get("/sales/:id", (request, response) => {
  const singleSale = avocadoSales.find((sale) => {
    // need the + to not be a string, make it a number.
    //return member.id === +req.params.id;
    // The 2 underneath is the same;
    // return member.id.toString() === +req.params.id;
    // return member.id == +req.params.id;
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

// Start the server, write: npm run dev
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
// Kill the server when done testing, to save battery:
// = ctrl + c
// To start the terminal in Windows = ctrl + ö