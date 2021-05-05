import express, { request } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
// Min api
//https://fethullah-week17-project-api.herokuapp.com/


// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
import goldenGlobesData from './data/golden-globes.json'
import avocadoSalesData from './data/avocado-sales.json'
import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// TO DO 
// Du kan göra knappar så att ifall jag trycker på en knapp så får jag filmer i enlighet med år etc etc. att du ändå gör frontend delen

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})








/*Movie Section*/

app.get('/goldenglobe', (req, res) => { // Golden Globe
  res.json(goldenGlobesData)
  console.log(goldenGlobesData)
})


app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const showWon = req.query.won
  const nominationPerYear = goldenGlobesData.filter((item) => item.year_award === +year)

  if(showWon) { //Checkbox eller toggle
    const onlyWon = nominationPerYear.filter((item) => item.win)
    res.json(onlyWon)
  }
  res.json(nominationPerYear)
})
/*************************/

/*Books section*/
app.get('/books', (request, response) => { // Books
  const { author } = request.query
  const books = booksData
  if(books) {
    if(author) {
    
      const searchAuthor = booksData.filter(book => book.authors.toLowerCase().includes(author)) // Skapa en Query
      response.json(searchAuthor) // books?author=Tolkien
      console.log(author)
    } else if(!author) {  // Denna funakr ej
      response.status(404).send(`No book with id number `)
    }
  }
  response.json(booksData)

})

/*
if(author) {
    
    const searchAuthor = booksData.filter(book => book.authors.toLowerCase().includes(author)) // Skapa en Query
    response.json(searchAuthor) // books?author=Tolkien
    console.log(author)
  } else if(!author) {
    console.log("Not Found")
  }

*/

app.get('/books/:id', (request, response) => {
  const { id } = request.params
  const searchBookID = booksData.find(book => book.bookID === +id)
  
  if(!searchBookID) {
    response.status(404).send(`No book with id number ${id} found, please try another number`)
  }
  response.json(searchBookID)
})







/******BOOK SECTION ENDS******/



/*AVOCADO BEGINS*/ /* http://localhost:8080/books?author=tolkien55 */

app.get('/sales', (req, res) => {
  const { region } = req.query
  const { priceBelow } = req.query
  const { priceAbove } = req.query
let filteredSales = avocadoSalesData
  if (region) {
    filteredSales = filteredSales.filter((sale) => {
      const regionLowerCase = sale.region.toLowerCase()
      return regionLowerCase.includes(region.toLowerCase())
    })
  }
  if (priceBelow) {
    filteredSales = filteredSales.filter((sale) => sale.averagePrice < +priceBelow)
  }
  if (priceAbove) {
    filteredSales = filteredSales.filter((sale) => sale.averagePrice < +priceAbove)
  }

  res.json(filteredSales)
})
/******Avocado SECTION ENDS******/







// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
