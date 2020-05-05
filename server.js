import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example: PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Home page
app.get('/', (req, res) => {
  res.send('This is an API with 1375 Netflix titles. Have fun exploring it! Possible routes: /titles, /titles/:id, /directors/:director, /releaseyear/:year')
})

// Gets the title with a specific id
app.get('/titles/:id', (req, res) => {
  const id = req.params.id
  const titleId = netflixData.find((item) => item.show_id === +id)
  if (titleId) {
    res.json(titleId)
  } else {
    res.status(404).send(`Sorry, no title was found with id: ${id}.`)
  }
})

//Pages with all titles
app.get('/titles', (req, res) => {

  // Queries for type, country and director:
  let titles = netflixData
  const showType = req.query.type
  const showCountry = req.query.country
  const showDirector = req.query.director

  //Query for page
  //Makes the number written in url to integer
  let pageSearch = parseInt(req.query.page)

  //Checks how many pages there is if every page has 10 objects
  const pageCount = Math.ceil(titles.length / 10)

  //If there's no page-query in the url, show first page
  if (!pageSearch) {
    pageSearch = 1
  }
  //If the page-query is bigger than the pageCount it should show the last page
  else if (pageSearch > pageCount) {
    pageSearch = pageCount
  }

  // Query for type: filter and return only the ones included in the query
  if (showType) {
    titles = titles.filter((item) => item.type.toLowerCase() === showType.toLowerCase())
    const pageCount = Math.ceil(titles.length / 10)
    if (!pageSearch) {
      pageSearch = 1
    }
    else if (pageSearch > pageCount) {
      pageSearch = pageCount
    } else {
      res.json(titles.slice(pageSearch * 10 - 10, pageSearch * 10))
    }
  }

  // Query for country: filter and return only the ones included in the query
  if (showCountry) {
    titles = titles.filter((item) => item.country.toLowerCase().includes(showCountry.toLocaleLowerCase()))
    const pageCount = Math.ceil(titles.length / 10)
    if (!pageSearch) {
      pageSearch = 1
    }
    else if (pageSearch > pageCount) {
      pageSearch = pageCount
    } else {
      res.json(titles.slice(pageSearch * 10 - 10, pageSearch * 10))
    }
  }

  // Query for director: filter and return only the ones included in the query
  if (showDirector) {
    titles = titles.filter((item) => item.director.toLowerCase().includes(showDirector.toLowerCase()))
    const pageCount = Math.ceil(titles.length / 10)
    if (!pageSearch) {
      pageSearch = 1
    }
    else if (pageSearch > pageCount) {
      pageSearch = pageCount
    } else {
      res.json(titles.slice(pageSearch * 10 - 10, pageSearch * 10))
    }
  }

  //Slice the data, begin on the page written in query
  res.json(titles.slice(pageSearch * 10 - 10, pageSearch * 10))
})


// // Gets everything a specific director has directed with pages
// app.get("/directors/:director", (req, res) => {
//   //query for pages
//   let pageSearch = parseInt(req.query.page)

//   const director = req.params.director
//   const titlesWithDirector = netflixData.filter((item) =>
//     item.director.toLowerCase().includes(director.toLowerCase()))
//   const pageCount = Math.ceil(titlesWithDirector.length / 10)
//   if (!pageSearch) {
//     pageSearch = 1
//   }
//   else if (pageSearch > pageCount) {
//     pageSearch = pageCount
//   } else {
//     res.json(titlesWithDirector.slice(pageSearch * 10 - 10, pageSearch * 10))
//   }
// })

// // Gets titles released a specific year with pages
// app.get('/releaseyear/:year', (req, res) => {
//   //query for pages
//   let pageSearch = parseInt(req.query.page)

//   const year = req.params.release_year
//   let titlesFromYear = netflixData.filter((item) => item.release_year === + year)

//   // Query for type (TV show or movie):
//   const showType = req.query.type
//   if (showType) {
//     titlesFromYear = titlesFromYear.filter((item) => item.type.toLowerCase() === showType.toLowerCase())
//     const pageCount = Math.ceil(titlesFromYear.length / 10)
//     if (!pageSearch) {
//       pageSearch = 1
//     }
//     else if (pageSearch > pageCount) {
//       pageSearch = pageCount
//     } else {
//       res.json(titlesFromYear.slice(pageSearch * 10 - 10, pageSearch * 10))
//     }
//   }
// })

// Gets everything a specific director has directed (no pages)
app.get("/directors/:director", (req, res) => {
  const director = req.params.director
  const titlesWithDirector = netflixData.filter((item) =>
    item.director.toLowerCase().includes(director.toLowerCase())
  );
  res.json(titlesWithDirector);
});

// Gets titles released a specific year (no pages)
app.get('/releaseyear/:year', (req, res) => {
  const year = req.params.year

  // Query for type (TV show or movie):
  const showType = req.query.type
  let titlesFromYear = netflixData.filter((item) => item.release_year === + year)

  if (showType) {
    titlesFromYear = titlesFromYear.filter((item) => item.type.toLowerCase() === showType.toLowerCase())
  }
  res.json(titlesFromYear)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
