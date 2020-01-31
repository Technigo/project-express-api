import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'


console.log(netflixData)




// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
//   PORT=9000 npm start
// const port = process.env.PORT || 5000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

/********** */
//ex of the json
// {
//   "show_id": 81193313,
//   "title": "Chocolate",
//   "director": "",
//   "cast": "Ha Ji-won, Yoon Kye-sang, Jang Seung-jo, Kang Bu-ja, Lee Jae-ryong, Min Jin-woong, Kim Won-hae, Yoo Teo",
//   "country": "South Korea",
//   "date_added": "November 30, 2019",
//   "release_year": 2019,
//   "rating": "TV- 14",
//   "duration": "1 Season",
//   "listed_in": "International TV Shows, Korean TV Shows, Romantic TV Shows",
//   "description": "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
//   "type": "TV Show"
// },
//***************** */

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

// here the first one maybe should be used with the show_id to get a unique endpoint
//maybe
// app.get('/shows', (req, res) => {
//   const titleSearchString = req.query.title;
//   const countrySearchString = req.query.country;
//   console.log(titleSearchString)
//   // console.log(countrySearchString)
//   let filteredShows = netflixData;

//   if (titleSearchString) {
//     //filter the data for a title
//     filteredShows = filteredShows.filter(item => {
//       const itemTitle = item.title.toString();
//       return itemTitle.includes(titleSearchString)
//       // return itemTitle.toLowerCase().includes(titleSearchString.toLowerCase())
//     })
//   };
//   if (countrySearchString) {
//     //filters the data again for a country
//     filteredShows = filteredShows.filter(item => {
//       const itemCountry = item.country.toString();

//       // return itemTitle.toLowerCase().includes(countrySearchString.toLowerCase())
//       return itemCountry.includes(countrySearchString)
//     })
//     res.json(filteredShows)
//   }
// })

/******* test 2 ********/
app.get('/shows', (req, res) => {
  const searchString = req.query.search;

  // console.log(countrySearchString)
  let filteredShows = netflixData;

  console.log(searchString)
  // if the (searchString) exist then do this:
  if (searchString) {
    //filter no 1:
    //filter the data for a title
    filteredShows = filteredShows.filter(item => {
      const itemTitle = item.title.toString();
      const itemCountry = item.country.toString();
      const itemDescrpition = item.description.toString();
      const itemDirector = item.director.toString();
      return itemTitle.includes(searchString) ||
        itemCountry.includes(searchString) ||
        itemDescrpition.includes(searchString) ||
        itemDirector.includes(searchString);

      // return itemTitle.toLowerCase().includes(titleSearchString.toLowerCase())
    })
    //filter no 2:
    // filteredShows = filteredShows.filter(item => {
    //   const itemCountry = item.country.toString();

    //   // return itemTitle.toLowerCase().includes(countrySearchString.toLowerCase())
    //   return itemCountry.includes(searchString)
    // })

    res.json(filteredShows)
  }
})

// example .find
// const inventory = [
//   {name: 'apples', quantity: 2},
//   {name: 'bananas', quantity: 0},
//   {name: 'cherries', quantity: 5}
// ];

// const result = inventory.find( ({ name }) => name === 'cherries' );

// console.log(result) // { name: 'cherries', quantity: 5 }

// I think I need some kind of if statement like if duration > "135 min" then
app.get('shows/length/:length', (req, res) => {
  // const length = req.params.length
  const length = req.query.length
  console.log(length)
  const searchLength = netflixData;

  const lengthResult = searchLength.find(({ duration }) => duration === " ")
  res.json(lengthResult)
})



app.get('/shows/id/:id', (req, res) => {
  const id = req.params.id
  // console.log(id)
  const showId = netflixData.filter((item) => item.show_id === +id)
  res.json(showId)
})

// create a new thing at a specific department
// app.post('/netflix/:id/rate', (req, res) => {
//   const ratings = res.params.id
//   res.json(ratings)
// });

// update specific netflix movie/tv-show if exists
// app.put('/netflix/:id', (req, res) => {
//   const newNetflix = res.params.id
//   res.json(newNetflix)
// });


app.get('/shows/year/:year', (req, res) => {
  const year = req.params.year
  // console.log(year)
  // const showMovies = req.query.shows
  let moviesFromYear = netflixData.filter((item) => item.release_year === +year)
  //not woking
  // if (showMovies) {
  //   moviesFromYear = moviesFromYear.filter((item) => item.type)
  // }
  res.json(moviesFromYear)
})




// ****delete****

//from the express website:
// app.delete('/', function (req, res) {
//   res.send('DELETE request to homepage')
// })


// app.delete('/id/:id{id}', (req, res) => {
//   const deleteId = req.params.year
//   console.log(deleteId)
//   res.json(deleteId)
// })


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
