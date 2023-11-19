import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import globalSharkAttackData from "./data/global-shark-attacks.json"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app)
  res.json(endpoints);
});

// Shark attacks endpoint to receive a collection of all shark attacks
app.get("/shark-attacks", (req, res) => {
  res.json(globalSharkAttackData)
});

// Shark attacks "id" endpoint, (used the original_order in json), to receive a single shark attack
app.get("/shark-attacks/:id", (req, res) => {
  const {id} = req.params
  const sharkAttack = globalSharkAttackData.find(sharkAttack => sharkAttack.original_order === +id)

  if (sharkAttack) {
    res.json(sharkAttack)
  } else {
  res.status(404).send("Unfortunately for you, but luckily for the swimmers - No shark attack was found!")
}
})

// Year of shark attacks endpoint. Also added query param for the possibility to filter if the shark attacks from a certain year was unprovoked
app.get("/shark-attacks/year/:year", (req, res) => {
  const year = req.params.year
  const typeUnprovoked = req.query.type
  let sharkAttacksFromYear = globalSharkAttackData.filter((sharkAttack) => sharkAttack.Year === +year)

if (sharkAttacksFromYear.length === 0) {
  return res.status(404).json({ error: "Calm waters - No shark attacks found from this year!" })
}

if (typeUnprovoked) {
sharkAttacksFromYear = sharkAttacksFromYear.filter((sharkAttack) => sharkAttack.Type.toLowerCase() === typeUnprovoked.toLowerCase())
}

res.json(sharkAttacksFromYear)
})

// Shark attacks species endpoint. Presents in a descending order the shark species that is most common in shark attacks
app.get("/species", (req, res) => {
 const speciesCount = {}

 globalSharkAttackData.forEach((attack) => {
  const species = attack.Species ? attack.Species.toUpperCase() : null; // Declare species variable first and convert to upper case to ensure that variations in case won't result in separate counts for the same species
   if (species) {
     if (speciesCount[species]) {
       speciesCount[species]++
     } else {
       speciesCount[species] = 1
     }
   }
 })

 // Convert object into an array of key-value pairs
  const speciesCountArray = Object.entries(speciesCount);

  // Sort the array based on count in descending order
  speciesCountArray.sort((a, b) => b[1] - a[1]);

  // Convert the sorted array back into an object
  const sortedSpeciesCount = {};
  speciesCountArray.forEach(([species, count]) => {
    sortedSpeciesCount[species] = count;
  });

  res.json(sortedSpeciesCount);
});

// Shark attacks activities endpoint. Presents in a descending order what the person who were attacked by the shark was doing at the time of the attack
app.get("/activities", (req, res) => {
  const activitiesCount = {};

  globalSharkAttackData.forEach((attack) => {
    const activity = attack.Activity ? attack.Activity.toUpperCase() : null; // Declare activity variable first and convert to upper case to ensure that variations in case won't result in separate counts for the same activity
    if (activity) {
      if (activitiesCount[activity]) {
        activitiesCount[activity]++;
      } else {
        activitiesCount[activity] = 1;
      }
    }
  });

  // Convert object into an array of key-value pairs
  const activitiesCountArray = Object.entries(activitiesCount);

  // Sort the array based on count in descending order
  activitiesCountArray.sort((a, b) => b[1] - a[1]);

  // Convert the sorted array back into an object
  const sortedActivitiesCount = {};
  activitiesCountArray.forEach(([activities, count]) => {
    sortedActivitiesCount[activities] = count;
  });

  res.json(sortedActivitiesCount);
});

// ------- Dummy endpoints -------
// An endpoint focusing specifically on shark attacks related to surfing.
 app.get("/surfing-incidents", (req, res) => {
 res.json("Here is a dummy endpoint for surfer incidents")
 })

// An endpoint that categorizes and provides statistics on fatal and non-fatal shark attacks.
 app.get("/fatal", (req, res) => {
 res.json("Here is a dummy endpoint for statistics on fatal and non-fatal shark attacks")
 })
// ------- End of dummy endpoints -------

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
