import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

const books = [
  {
    "bookID": 1,
    "title": "Harry Potter and the Half-Blood Prince (Harry Potter  #6)",
    "authors": "J.K. Rowling-Mary GrandPré",
    "average_rating": 4.56,
    "isbn": 439785960,
    "isbn13": 9780439785969,
    "language_code": "eng",
    "num_pages": 652,
    "ratings_count": 1944099,
    "text_reviews_count": 26249
  },
  {
    "bookID": 2,
    "title": "Harry Potter and the Order of the Phoenix (Harry Potter  #5)",
    "authors": "J.K. Rowling-Mary GrandPré",
    "average_rating": 4.49,
    "isbn": 439358078,
    "isbn13": 9780439358071,
    "language_code": "eng",
    "num_pages": 870,
    "ratings_count": 1996446,
    "text_reviews_count": 27613
  },
  {
    "bookID": 3,
    "title": "Harry Potter and the Sorcerer's Stone (Harry Potter  #1)",
    "authors": "J.K. Rowling-Mary GrandPré",
    "average_rating": 4.47,
    "isbn": 439554934,
    "isbn13": 9780439554930,
    "language_code": "eng",
    "num_pages": 320,
    "ratings_count": 5629932,
    "text_reviews_count": 70390
  },
  {
    "bookID": 4,
    "title": "Harry Potter and the Chamber of Secrets (Harry Potter  #2)",
    "authors": "J.K. Rowling",
    "average_rating": 4.41,
    "isbn": 439554896,
    "isbn13": 9780439554893,
    "language_code": "eng",
    "num_pages": 352,
    "ratings_count": 6267,
    "text_reviews_count": 272
  },
  {
    "bookID": 5,
    "title": "Harry Potter and the Prisoner of Azkaban (Harry Potter  #3)",
    "authors": "J.K. Rowling-Mary GrandPré",
    "average_rating": 4.55,
    "isbn": "043965548X",
    "isbn13": 9780439655484,
    "language_code": "eng",
    "num_pages": 435,
    "ratings_count": 2149872,
    "text_reviews_count": 33964
  },
  {
    "bookID": 8,
    "title": "Harry Potter Boxed Set  Books 1-5 (Harry Potter  #1-5)",
    "authors": "J.K. Rowling-Mary GrandPré",
    "average_rating": 4.78,
    "isbn": 439682584,
    "isbn13": 9780439682589,
    "language_code": "eng",
    "num_pages": 2690,
    "ratings_count": 38872,
    "text_reviews_count": 154
  },
  {
    "bookID": 9,
    "title": "Unauthorized Harry Potter Book Seven News: \"Half-Blood Prince\" Analysis and Speculation",
    "authors": "W. Frederick Zimmerman",
    "average_rating": 3.69,
    "isbn": 976540606,
    "isbn13": 9780976540601,
    "language_code": "en-US",
    "num_pages": 152,
    "ratings_count": 18,
    "text_reviews_count": 1
  },
  {
    "bookID": 10,
    "title": "Harry Potter Collection (Harry Potter  #1-6)",
    "authors": "J.K. Rowling",
    "average_rating": 4.73,
    "isbn": 439827604,
    "isbn13": 9780439827607,
    "language_code": "eng",
    "num_pages": 3342,
    "ratings_count": 27410,
    "text_reviews_count": 820
  },
  {
    "bookID": 12,
    "title": "The Ultimate Hitchhiker's Guide: Five Complete Novels and One Story (Hitchhiker's Guide to the Galaxy  #1-5)",
    "authors": "Douglas Adams",
    "average_rating": 4.38,
    "isbn": 517226952,
    "isbn13": 9780517226957,
    "language_code": "eng",
    "num_pages": 815,
    "ratings_count": 3602,
    "text_reviews_count": 258
  },
  {
    "bookID": 13,
    "title": "The Ultimate Hitchhiker's Guide to the Galaxy",
    "authors": "Douglas Adams",
    "average_rating": 4.38,
    "isbn": 345453743,
    "isbn13": 9780345453747,
    "language_code": "eng",
    "num_pages": 815,
    "ratings_count": 240189,
    "text_reviews_count": 3954
  },
  {
    "bookID": 14,
    "title": "The Hitchhiker's Guide to the Galaxy (Hitchhiker's Guide to the Galaxy  #1)",
    "authors": "Douglas Adams",
    "average_rating": 4.22,
    "isbn": 1400052920,
    "isbn13": 9781400052929,
    "language_code": "eng",
    "num_pages": 215,
    "ratings_count": 4416,
    "text_reviews_count": 408
  },
  {
    "bookID": 16,
    "title": "The Hitchhiker's Guide to the Galaxy (Hitchhiker's Guide to the Galaxy  #1)",
    "authors": "Douglas Adams-Stephen Fry",
    "average_rating": 4.22,
    "isbn": 739322206,
    "isbn13": 9780739322208,
    "language_code": "eng",
    "num_pages": 6,
    "ratings_count": 1222,
    "text_reviews_count": 253
  },
  {
    "bookID": 18,
    "title": "The Ultimate Hitchhiker's Guide (Hitchhiker's Guide to the Galaxy #1-5)",
    "authors": "Douglas Adams",
    "average_rating": 4.38,
    "isbn": 517149257,
    "isbn13": 9780517149256,
    "language_code": "en-US",
    "num_pages": 815,
    "ratings_count": 2801,
    "text_reviews_count": 192
  },
  {
    "bookID": 21,
    "title": "A Short History of Nearly Everything",
    "authors": "Bill Bryson-William Roberts",
    "average_rating": 4.2,
    "isbn": "076790818X",
    "isbn13": 9780767908184,
    "language_code": "eng",
    "num_pages": 544,
    "ratings_count": 228522,
    "text_reviews_count": 8840
  },
  {
    "bookID": 22,
    "title": "Bill Bryson's African Diary",
    "authors": "Bill Bryson",
    "average_rating": 3.43,
    "isbn": 767915062,
    "isbn13": 9780767915069,
    "language_code": "eng",
    "num_pages": 55,
    "ratings_count": 6993,
    "text_reviews_count": 470
  },
  {
    "bookID": 23,
    "title": "Bryson's Dictionary of Troublesome Words: A Writer's Guide to Getting It Right",
    "authors": "Bill Bryson",
    "average_rating": 3.88,
    "isbn": 767910435,
    "isbn13": 9780767910439,
    "language_code": "eng",
    "num_pages": 256,
    "ratings_count": 2020,
    "text_reviews_count": 124
  },
  {
    "bookID": 24,
    "title": "In a Sunburned Country",
    "authors": "Bill Bryson",
    "average_rating": 4.07,
    "isbn": 767903862,
    "isbn13": 9780767903868,
    "language_code": "eng",
    "num_pages": 335,
    "ratings_count": 68213,
    "text_reviews_count": 4077
  },
  {
    "bookID": 25,
    "title": "I'm a Stranger Here Myself: Notes on Returning to America After Twenty Years Away",
    "authors": "Bill Bryson",
    "average_rating": 3.9,
    "isbn": "076790382X",
    "isbn13": 9780767903820,
    "language_code": "eng",
    "num_pages": 304,
    "ratings_count": 47490,
    "text_reviews_count": 2153
  },
  {
    "bookID": 26,
    "title": "The Lost Continent: Travels in Small Town America",
    "authors": "Bill Bryson",
    "average_rating": 3.83,
    "isbn": 60920084,
    "isbn13": 9780060920081,
    "language_code": "en-US",
    "num_pages": 299,
    "ratings_count": 43779,
    "text_reviews_count": 2146
  },
  {
    "bookID": 27,
    "title": "Neither Here nor There: Travels in Europe",
    "authors": "Bill Bryson",
    "average_rating": 3.87,
    "isbn": 380713802,
    "isbn13": 9780380713806,
    "language_code": "eng",
    "num_pages": 254,
    "ratings_count": 46397,
    "text_reviews_count": 2127
  },
  {
    "bookID": 28,
    "title": "Notes from a Small Island",
    "authors": "Bill Bryson",
    "average_rating": 3.92,
    "isbn": 380727501,
    "isbn13": 9780380727506,
    "language_code": "eng",
    "num_pages": 324,
    "ratings_count": 76476,
    "text_reviews_count": 3159
  },
  {
    "bookID": 29,
    "title": "The Mother Tongue: English and How It Got That Way",
    "authors": "Bill Bryson",
    "average_rating": 3.94,
    "isbn": 380715430,
    "isbn13": 9780380715435,
    "language_code": "eng",
    "num_pages": 270,
    "ratings_count": 26672,
    "text_reviews_count": 1986
  },
  {
    "bookID": 30,
    "title": "J.R.R. Tolkien 4-Book Boxed Set: The Hobbit and The Lord of the Rings",
    "authors": "J.R.R. Tolkien",
    "average_rating": 4.59,
    "isbn": 345538374,
    "isbn13": 9780345538376,
    "language_code": "eng",
    "num_pages": 1728,
    "ratings_count": 97731,
    "text_reviews_count": 1536
  }
]

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (request, response) => {
  response.send('My very first backend project!')
})

app.get('/books', (request,response) => {
  const {name} = request.query
  if(name) {
    const filteredBooks = books.filter(book => book.bookID === bookID)
    response.json(filteredBooks)
  } else {
    response.json(books)
  }

})

app.get('/books/:id', (request, response) => {
 const {bookID} = request.params
 const book = books.find((book) => books.bookID === +bookID)
 response.json(book)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
