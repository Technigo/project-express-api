import express from "express";
import cors from "cors";
import members from "./data/technigo-members.json"

import netflixData from "./data/netflix-titles.json";

const port = process.env.PORT || 8080;
// express prepares app, after all starts with app here below
const app = express();

// Add middlewares to enable cors and json body parsing
// now app accepts all origins
app.use(cors());
//backend unpacking json to digestible javascript spacesuit/spaceship
app.use(express.json());

// Start defining your routes here
// first endpoint use send the others .json
app.get("/", (req, res) => {
  res.send("Hello Reality shows!");
});

//frist argument is end url and second is express callback
//request is the info comes to backend when send req from frontend 
//response send back path  to frontend after executing stuff 
//pingpong frontend starts game, this is like the eventlistener function
//send makes us able transferr all kinds of data to send
//json always send json data but we will mostly use
//express use 200 as default

//this returns chaos since to big!

app.get("/netflixData", (req, res) => {
res.status(200).json({
data: netflixData,
success: true,
});
});

//netflixData/listed_in/Reality TV works! But not for multiple categories!
//but works with all different listed_in categorys like Horror TV etc

app.get("/netflixData/listed_in/:listed_in", (req, res) => {
  // console.log(req.params)

  //destructuring
  const { listed_in } = req.params

  const showByListedIn = netflixData.filter(
    (show) => show.listed_in.toLowerCase() === listed_in.toLowerCase())

    //not sure yet wich status code
  if (!showByListedIn) {
    res.status(404).json({
      data:"Not Found",
      success: false,
    })
  } else {
    res.status(200).json({
      data:showByListedIn,
      success: true,
    })
  }
})

//get listed in and title? other combos xD? it is only supposed to get ONE here so only choice ...
//?role=Codecoach&name=Poya

app.get("/members", (req, res) => {
  const { name, role } = req.query

  let allMembers = members

  if (role) {
    allMembers = allMembers.filter(
      (member) => member.role.toLowerCase() === role.toLowerCase())
  }

  // when we type only matilda this gives us only mathilda
  if (name) {
    allMembers = allMembers.filter(
      (member) => member.name === name)
  }
  res.status(200).json({
    data: allMembers,
    success: true,
    });
})



//?role=Codecoach&name=Poya
app.get("/members", (req, res) => {
  const { name, role } = req.query

  let allMembers = members

  if (role) {
    allMembers = allMembers.filter(
      (member) => member.role.toLowerCase() === role.toLowerCase())
  }

  // when we type only matilda this gives us only mathilda
  if (name) {
    allMembers = allMembers.filter(
      (member) => member.name === name)
  }
  res.status(200).json({
    data: allMembers,
    success: true,
    });
})

//express cant use /members again, needs to beunique since start up and down
//path params looks like slug dynamic ids from route, in url we can typ Mathilda now
// req.params.name is the one we write and pass like mathilda
//need route uniqueness so browser do not know diff between :name and :role so need /name etc before
app.get("/members/name/:name", (req, res) => {
  // console.log(req.params)

  //destructuring 
  //find needs unique value, first member with that name, return as object
  //if duplicates find only finds first
  const { name } = req.params

  const memberByName = members.find(
    (member) => member.name === name)

  if (!memberByName) {
    res.status(404).json({
      data:"Not Found",
      success: false,
    })
  } else {
    res.status(200).json({
      data:memberByName,
      success: true,
    })
  }
})

//filter takes all elements with the req , diff with find
app.get('/members/role/:role', (req, res) => {
  const { role } = req.params;

  const membersByRole = members.filter(
    (member) => member.role.toLowerCase() === role.toLowerCase())
  // console.log('Members by role:', membersByRole)

  //still 200 even if there is no green toys in the store, still successful search
// we can google like empty array status code, discussiona about this
//frontend usually handles this displaying like with an empty list
    res.status(200).json({
      data:membersByRole,
      success: true,
    })

});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
