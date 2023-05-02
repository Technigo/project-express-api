import express from "express";
import cors from "cors";
import workoutsData from "./data/workouts.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start

const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (request, response) => {
  response.json(listEndpoints(app));

});

// const responseStatus = (request, response, workouts) => {
//   if (workouts) {
//     response.status(200).json({
//       success: true,
//       message: "OK",
//       body: {
//         workoutsData : workouts
//       }
//     });
//   } else {
//     response.status(500).json({
//       success: false,
//       message: "Something went wrong",
//       body: {}
//     });
//   }
// }


// get all workouts
app.get("/workouts", (request, response) => {
  const workouts = workoutsData;
  // responseStatus(request, response, workouts);
  if (workouts) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        workoutsData : workouts
      }
    });
  } else {
    response.status(500).json({
      success: false,
      message: "Something went wrong",
      body: {}
    });
  }
});

// get workout by id
app.get("/workouts/:Id", (request, response) => {
  const singleWorkout = workoutsData.find((workout) => {
    const { Id } = request.params;
    console.log("id: ", Id)
    return workout.Id === Number (Id);
    // return member._id === id; this doesnt work because id is a numeric value in json but in the param it's always a string
    // return member._id.toString() === id;
    // putting a numerical operator infront of string will force js to evaluate as string
    // return member._id === +id 
  });
  if (singleWorkout) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        workout: singleWorkout
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Something went wrong",
      body: {}
    });
  }
});

// get workouts by body part
app.get("/workouts/body-part", (request, response) => {
  const { BodyPart } = request.query;
  console.log("body part: ", BodyPart)

  let workouts = workoutsData;
  if (workouts) {
    workouts = workoutsData.filter((singleWorkout) => {
      return singleWorkout.BodyPart.toLowerCase() === BodyPart.toLowerCase();
    });
  } 

  if (workouts) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        workoutsData : workouts
      }
    });
  } else {
    response.status(500).json({
      success: false,
      message: "Something went wrong",
      body: {}
    });
  }
});
// DRY - don't repeat yourself

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

/// endpoint/:pathParam1/:pathParam2?queryParamName=queryParamValue&queryParam5Name=queryParam5Value&queryParam2Name=queryParam2Value