import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data/data.json'
import netflixData from './data/netflix-titles.json'


//const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})


//GETS THE WHOLE DATA-SET UNFILTERED
app.get('/collection', (req, res) => {
  res.json(netflixData)
})

// !!THIS IS SUPPOST TO FILTER TYPE OF NETFLIX CONTENT AND COUNTRY WITH QUERIES BUT IT'S NOT WORKING
//AND I DON'T UNDERSTAND WHY...

// app.get('/collection', (req, res) => {
//   let collection = netflixData
//   const typeOfContent = req.query.type
//   const showCountry = req.query.country

//   if(typeOfContent) {
//     collection = collection.filter((item) => item.type.toLowerCase() === typeOfContent.toLowerCase())
//   }if(showCountry){
//     collection = collection.filter((item) => item.country.toLowerCase() === showCountry.toLowerCase())
//   }
//   res.json(collection)
// })


//GETS ALL MOVIES
app.get('/movies', (req, res) => {
  const onlyMovies = netflixData.filter((item) => item.type === "Movie")

  res.json(onlyMovies)
})


//LOOKS FOR ALL MOVIES FROM A SPECIFIC YEAR AND ADDITIONAL QUERY FOR COUNTRY
app.get('/movies/:year', (req, res) => {
  const year = req.params.year
  const onlyMovies = netflixData.filter((item) => item.type === "Movie")
  let moviesFromYear = onlyMovies.filter((item) => item.release_year === +year)
  const country = req.query.country

  if (country) {
    console.log(country)
    moviesFromYear = moviesFromYear.filter((item) => item.country.toLowerCase() === country.toLowerCase())
  }

  res.json(moviesFromYear)
})





//GETS ALL THE TV-SHOWS
app.get('/tvshows', (req, res) => {
  const onlyTvShows = netflixData.filter((item) => item.type === 'TV Show')
  res.json(onlyTvShows)
})


//LOOKS FOR TV-SHOWS WITHIN A SPECIFIC GENRE
app.get('/tvshows/:genre', (req, res) => {
  const genre = req.params.genre.toString()
  const onlyTvShows = netflixData.filter((item) => item.type === 'TV Show')
  const specificGenreTv = onlyTvShows.filter((item) => item.listed_in.toLowerCase().includes(genre.toLowerCase()))

  res.json(specificGenreTv)
})


//LOOKS FOR TV-SHOWS WITHIN A SPECIFIC GENRE AND FILTERS ON YEAR WITH QUERY
//NOT WORKING!
app.get('/tvshows:genre', (req, res) => {
  const genre = req.params.genre
  let onlyTvShows = netflixData.filter((item) => item.type === 'TV Show')
  let specificGenreTv = onlyTvShows.filter((item) => item.listed_in.toLowerCase().includes(genre.toLowerCase()))
  const year = req.query.year

  if (year) {
    specificGenreTv = specificGenreTv.filter((item) => item.release_year === +year)
  }
  res.json(specificGenreTv)
})


//LOOKS FOR A SPECIFIC TITLE IN THE ENTIRE COLLECTION. 
//ERROR MESSAGE NOT WORKING

app.get('/titles/:title', (req, res) => {
  const title = req.params.title
  const specTitle = netflixData.filter((item) => item.title === title)

  if (specTitle) {
    title.includes({ specTitle }) === true

    console.log(specTitle)
    res.json(specTitle)
  }
  else {
    res.status(404).json({ message: `${title} is not included in the Netlix collection` })

  }
})
///shows?type=movie&year=2019


//SAME AS ABOVE BUT WITH DIFFERENT APPROACH TO ERRORMESSAGE. 
//NOT WORKING
app.get('/titles/:title', (req, res) => {
  const title = req.params.title
  const specTitle = netflixData.filter((item) => item.title === title)

  // if(!title){
  //   res.status(404).json({message: `${title} is not included in the Netlix collection`})
  //   console.log(title)

  // }
  // else{
  //   title === (specTitle)
  res.json(specTitle)

  // }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
