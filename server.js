import express from "express";
import cors from "cors";
import inequality from "./data/inequality.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// env environmental variables 
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing

//app.usecors access and ping our server/receive requests from cross origin 
app.use(cors());
//easily access body of our request and do something with it 
app.use(express.json());

// structure of how we will be building endpoints 
//request what Frontend sens, response what backend sends back
// Start defining your routes here
app.get("/", (req, res) => {
  //res.send("Hello Technigo!");
  res.json(listEndpoints(app));
});

// get entire ranking 
app.get("/ranking", (req, res) => {
  const inequalityRanking = inequality;
  if (inequalityRanking) {
    res.status(200).json(
      {
        success: true,
        message: "Ok",
        body: {
          inequality: inequalityRanking
        }
      }
    );
  } else {
    res.status(500).json(
      {
        success: false,
        message: "Error",
        body: {}        
      }
    )
  }
});

/*
//get single country ranking 
app.get("/ranking/:country", (req, res) => {
  const {country} = req.params;
  console.log("country: ", country );
  const singleCountry = inequality.find((countryRanking) => {
    return( countryRanking.Country === country)
  });
  if (singleCountry) {
    res.status(200).json(
      {
        success: true,
        message: "Ok",
        body: {
          country: singleCountry
        }
      }
    );
  } else {
    res.status(404).json(
      {
        success: false,
        message: "Country not found",
        body: {}        
      }
    )
  }
});

*/


//get single ranking 
app.get("/ranking/:rank", (req, res) => {
  const {rank} = req.params;
  console.log("ranking: ", rank );
  const singleRanking = inequality.find((countryRank) => {
    return( countryRank.Rank == Number(rank))
  });
  if (singleRanking) {
    res.status(200).json(
      {
        success: true,
        message: "Ok",
        body: {
          Rank: singleRanking
        }
      }
    );
  } else {
    res.status(404).json(
      {
        success: false,
        message: "Ranking not found",
        body: {}        
      }
    )
  }
});

// to start application qe go to port and we trigger endpoints 
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


/// endpoint/:pathParam1/:pathParam2?queryParamName=queryParamValue&queryParam5Name=queryParam5Value&queryParam2Name=queryParam2Value