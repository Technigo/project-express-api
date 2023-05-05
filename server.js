import express from "express";
import cors from "cors";
//import booksData from "./data/books.json";
import fullMoonData from "./data/csvjson.json";
//import bodyParser from 'body-parser'


//import avocadoSalesData from "./data/avocado-sales.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
//app.use(bodyParser.json())

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get("/fullmoon", (request, response) => {
  const fullmoon = fullMoonData;
  if (fullmoon) {
    response.status(200).json({
      success: true,
      message: "ok",
      body: {
        fullMoonData: fullmoon
      }
    });
  } else {
    response.status(500).json({
      success: false,
      message: "Something went wrong",
      body: {}
    });
  } 
})

//Endpoint for one specific date
app.get("/fullmoon/:date", (request, response) => {
  const singleFullmoon = fullMoonData.find((fullmoon) => {
    const fullmoonDate = new Date(fullmoon.Date);
    const requestDate = new Date(request.params.date);
    return fullmoonDate.getTime() === requestDate.getTime();
  });

  if (singleFullmoon) {
    response.status(200).json({
      success: true,
      message: "ok",
      body: {
        fullmoon: singleFullmoon
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "No fullmoon this date",
      body: {}
    });
  } 
});

app.get("/fullmoon/day/:day"), (request, response) => {
  const day = req.params.day;
  const dayWithFullmoon = data.filter((item) => item.Day === day)
  res.json(dayWithFullmoon)
}


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
