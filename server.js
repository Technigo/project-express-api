import express, { response } from 'express';
import bodyParser, { json } from 'body-parser';
import cors from 'cors';

// Data I want to use to create end points with
import booksData from './data/books.json';

//Instance of express
const app = express();

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
// PORT=9000 npm start
const port = process.env.PORT || 8081;

// Add middlewares to enable cors and json body parsing
// Cors makes it easier to use the API, allows API's to say where the requests come from.
// bodyParser allows express to read json in post requests
app.use(cors());
app.use(bodyParser.json());

/* ---- First endpoint ----
Endpoint that returns the whole array of data and also for books based on author, title, language or average rating when using the query paramater. 
Each if statement is checked and if true will either return the results or an error message as the array returned is empty (e.g. if the user has entered an incorrect author, title, langauage etc).

Example routes:
http://localhost:8081/books/search - Returns the whole data set/array
http://localhost:8081/books/search?author=Rowling - Searches for books based on author
http://localhost:8081/books/search?title=Harry - Searches for books based on title
http://localhost:8081/books/search?language=eng  - Searches for books based on language
eng, en-GB, en-US, spa, fre, ger, ara, por, grc, mul
http://localhost:8081/books/search?averagerating=4.5 - Searches for books based on avergage rating.

request, response is callback function
*/
app.get('/books/search', (request, response) => {
  const {author, title, language, averagerating} = request.query;

  if (author) {
    const authorResults = booksData.filter((item) => item.authors.toLocaleLowerCase().includes(author.toLocaleLowerCase()));
    if(authorResults.length === 0) {
      response.status(404).json("Sorry that author doesn't exist.");
    } else {
      response.json(authorResults);
    }
  }
  
  if (title) {
    const titleResults = booksData.filter((item) => item.title.toString().toLocaleLowerCase().includes(title.toLocaleLowerCase()));
    if(titleResults.length === 0) {
      response.status(404).json("Sorry that book title doesn't exist.");
    } else {
      response.json(titleResults);
    }
  }

  if (language) {
    const languageResults = booksData.filter((item) => item.language_code === language);
    if(languageResults.length === 0) {
      response.status(404).json("Sorry we don't have any books in that language.");
    } else {
      response.json(languageResults);
    }
  }

  // "+" on averagerating turns the string in to a number.
  if (averagerating) {
    const aveRatingResults = booksData.filter((item) => item.average_rating === +averagerating);
    if(aveRatingResults.length === 0) {
      response.status(404).json("Sorry, that rating doesn't exist.");
    } else {
      response.json(aveRatingResults);
    }
  } 
  response.json(booksData);
});

/* ---- Second endpoint ----
Getting a specific book based on the id added to the endpoint. 
:id is a variable that will be the value the user has specified on the endpoint e.g. 3. Use params to get the id/value the user has specified in endpoint and put that into the bookId variable. We then use that when finding the id in the array by comparing the bookID number in the array with the id the user has specified on the endpoint. 
If statement for if the length of the specificBook variable/array is 0 (i.e. the author doesn't exist) then return the error message, else translate the bookID element from the array into json so the data it's readable on the endpoint.*/
//http://localhost:8081/books/10
app.get('/books/:id', (request, response) => {
  const bookID  = request.params.id;
  const specificBook = booksData.find(item => item.bookID === +bookID);
  
  if (!specificBook) {
    response.status(404).json("ID doesn't correspond to any book in our API");    
  }   
  response.json(specificBook);    
});

// Created an object outlining the documentation. Can be found on the start page of the api url
const documentation = {
  "Endpoint 1": "https://books-deployment.herokuapp.com/books/search - Use this endpoint to return the entire array of data",
  "Endpoint 1 with author query": "https://books-deployment.herokuapp.com/books/search?author=Rowling - Use this endpoint to return books by a specific author",
  "Endpoint 1 with title query": "https://books-deployment.herokuapp.com/books/search?title=HarryPotter - Use this endpoint to return books with a specific title",
  "Endpoint 1 with language query": "https://books-deployment.herokuapp.com/books/search?language=eng - Use this endpoint to return books written in a specific language: eng, en-GB, en-US, spa, fre, ger, ara, por, grc, mul",
  "Endpoint 1 with average rating query": "https://books-deployment.herokuapp.com/books/search?averagerating=4 - Use this endpoint to return books with a specific average rating",
  "Endpoint 2": "https://books-deployment.herokuapp.com/books/:id - Use this endpoint to return books with a specific id and replace :id with a number",
}
 
// Path for my api documentation to be found which is the homepage of the url
app.get('/', (request, response) => {
  response.json(documentation);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running!`)
});