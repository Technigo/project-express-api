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

// Shark attacks endpoint
app.get("/shark-attacks", (req, res) => {
  res.json(globalSharkAttackData)
});

// Shark attacks "id" endpoint, (used the original_order in json).
app.get("/shark-attacks/:id", (req, res) => {
  const {id} = req.params
  const sharkAttack = globalSharkAttackData.find(sharkAttack => sharkAttack.original_order === +id)

  if (sharkAttack) {
    res.json(sharkAttack)
  } else {
  res.status(404).send("Unfortunately for you, but luckily for the swimmers - No shark attack was found!")
}
})

// Year of shark attacks endpoint. Including query param for the possibility to filter if a shark attack was unprovoked, for example by typing /shark-attacks/year/2023?type=unprovoked
app.get("/shark-attacks/year/:year", (req, res) => {
  const year = req.params.year
  const typeUnprovoked = req.query.type
  let sharkAttacksFromYear = globalSharkAttackData.filter((sharkAttack) => sharkAttack.Year === +year)
  console.log("SharkAttack:", year, typeof year)

if (sharkAttacksFromYear.length === 0) {
  return res.status(404).json({ error: "No shark attacks found from this year" })
}

if (typeUnprovoked) {
sharkAttacksFromYear = sharkAttacksFromYear.filter((sharkAttack) => sharkAttack.Type.toLowerCase() === typeUnprovoked.toLowerCase())
}

res.json(sharkAttacksFromYear)
})

// Shark attacks species endpoint
app.get("/shark-attacks/species", (req, res) => {
   res.json(globalSharkAttackData)
// const speciesCount = {}

// globalSharkAttackData.forEach((attack) => {
//   if (attack.Species) {
//     const species = attack.Species
//     if (speciesCount[species]) {
//       speciesCount[species]++
//     } else {
//       speciesCount[species] = 1
//     }
//   }
// })

// console.log(speciesCount)

// res.json(speciesCount)
})

// app.get("/shark-attacks/species", (req, res) => {
// const speciesSet = new Set()

// globalSharkAttackData.forEach((attack) => {
//     if (attack.Species) {
//       speciesSet.add(attack.Species);
//     }
//   });

//   const uniqueSpecies = Array.from(speciesSet); // Convert Set to array
//  console.log(uniqueSpecies); // Add this line to log the unique species
//   res.json(uniqueSpecies);
// })

app.get("/shark-attacks/activities", (req, res) => {
  const activitiesCount = {};

  globalSharkAttackData.forEach((attack) => {
    const activity = attack.Activity;
    if (activity) {
      if (activitiesCount[activity]) {
        activitiesCount[activity]++;
      } else {
        activitiesCount[activity] = 1;
      }
    }
  });

  console.log(activitiesCount); // Log activities and their occurrences
  
  res.json(activitiesCount);
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
