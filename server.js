import express from "express";
import cors from "cors";
import workoutsData from "./data/workouts.json";

const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints');

// Middleware to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Function for response status
const responseStatus = (request, response, workouts) => {
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
}

// Defining routes
app.get("/", (request, response) => {
  response.json(listEndpoints(app));
});

// get all workouts
app.get("/workouts/all", (request, response) => {
  const workouts = workoutsData;
  responseStatus(request, response, workouts);
});

// get workout by id
app.get("/workouts/:Id", (request, response) => {
  const singleWorkout = workoutsData.find((workout) => {
    const { Id } = request.params;
    console.log("id: ", Id)
    return workout.Id === Number (Id);
  });
  responseStatus(request, response, singleWorkout);
});

// get workouts by body part
app.get("/workouts", (request, response) => {
  const { BodyPart } = request.query;
  console.log("body part: ", BodyPart)

  let workouts = workoutsData;
  if (workouts) {
    workouts = workoutsData.filter((singleWorkout) => {
      return singleWorkout.BodyPart.toLowerCase() === BodyPart.toLowerCase();
    });
  } 
  responseStatus(request, response, workouts);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});