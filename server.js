import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// import the api
import netflixData from './data/netflix-titles.json'


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('View these endpoints /netflixlist /year:year (try 2019)')
})

app.get('/netflixlist', (req, res) => {
  res.json(netflixData)
})

app.get('/year/:year', (req, res) => {

  const year = req.params.year 
  const netflixReleaseYear = netflixData.filter((item) => +item.release_year === +year)
  res.json(netflixReleaseYear)
})


// app.get('/people', (req, res) => {
//   const { name } = req.query;

//   const personsFound = people.filter((person) => person.name.includes(name));

//   res.send(personsFound);
// });

// app.get('/title', (req, res) => {

//   const titles = netflixData.filter(item => item.title);

//   res.send(netflixData(titles))
// })


// var jediPersonnel = personnel.filter(function (person) {
//   return person.isForceUser;
// });
// Result: [{...}, {...}, {...}] (Luke, Ezra and Caleb)


// const rebels = pilots.filter(pilot => pilot.faction === "Rebels");


// const notTheCs = pokemons.filter(item => !item.startsWith("C"));
// console.log(notTheCs);

// app.get('/netflixlist/:show_id', (req, res) => {

//   const { show_id } = req.params;

//   const netflixidfound = netflixlist.find(
//     (netflixid) => netflixid.show_id === +show_id
//   );

//   res.send(netflixidfound);
// });




// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})