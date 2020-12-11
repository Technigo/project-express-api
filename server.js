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

// Welcome message when you enter the url
app.get('/', (request, response) => {
  response.json("Welcome to Claire's book API 🌼 For documentation go to https://books-deployment.herokuapp.com/documentation");
});

/* --- First endpoint ---
Endpoint that returns different data depending on the query e.g. author, title, language, average rating and page. 

Example routes for author, title, language and average rating:
http://localhost:8081/books?author=rowling
http://localhost:8081/books?title=harry
http://localhost:8081/books?language=eng
eng, en-GB, en-US, spa, fre, ger, ara, por, grc, mul
http://localhost:8081/books?averagerating=4

For the the page query a list of 50 results will be returned from the books array that have been pre-sliced using the slice method. 
What data is returned depends on what number the user has queried in the endpoint. The number specified will have a 1 subtracted from it. The number will be then matched with the index number of one of the pageArray elements. This will the return the 50 books that have been sliced in that array index 
e.g. http://localhost:8081/books?page=1 will have 1 subrtracted from it so it will be 0, then it will look for that index number and return the data that is being sliced in that array element.
*/

app.get('/books', (request, response) => {
  const { author, title, language, averagerating, page } = request.query;

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

  const pageArray = [
    booksData.slice(0,50),
    booksData.slice(50,101),
    booksData.slice(101,152),
    booksData.slice(152,203),
    booksData.slice(203,255),
    booksData.slice(255,306),
    booksData.slice(306,357),
    booksData.slice(357,408), 
    booksData.slice(408,459),
    booksData.slice(459,499)
  ];

  response.json(pageArray[page-1]);

  // if(page === 1) {
  //   response.json(pageArray[0])
  // } else if (page === 2) {
  //   response.json(pageArray[1])
  // } else if (page === 3) {
  //   response.json(pageArray[2])
  // }
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
    response.status(404).json("Sorry that ID doesn't correspond to any book in our API");    
  }   
  response.json(specificBook);    
});

// Created an object outlining the documentation. Can be found on the start page of the api url
const documentation = {
  "Endpoint 1 with author query string parameter": "https://books-deployment.herokuapp.com/books?author=Rowling - Use this endpoint to return books by a specific author using the author query parameter. It will return an array with one or more elements, if the author isn't valid then you will get an error message.",

  "Endpoint 1 with title query string parameter": "https://books-deployment.herokuapp.com/books?title=HarryPotter - Use this endpoint to return books with a specific title using the title query parameter. It will return an array with one or more elements, if the author isn't valid then you'll get an error message.",

  "Endpoint 1 with language query string parameter": "https://books-deployment.herokuapp.com/books?language=eng - Use this endpoint to return books written in a specific language using the title query parameter. It will return an array with one or more elements. The following languages are valid: eng, en-GB, en-US, spa, fre, ger, ara, por, grc, mul. If the language isn't valid then you'll get an error message.",

  "Endpoint 1 with average rating query string parameter": "https://books-deployment.herokuapp.com/books?averagerating=4 - Use this endpoint to return books with a specific average rating using the averagerating query parameter. It will return an array with one or more elements. If the average rating isn't found you'll get an error message.",

  "Endpoint 1 with page query string parameter": "https://books-deployment.herokuapp.com/books?page=1 - This endpoint uses the page query parameter and allows you to query up to 10 pages which will return 50 books per page. You can use this to implement pages in the frontend.",

  "Endpoint 2": "https://books-deployment.herokuapp.com/books/:id - Use this endpoint to return books with a specific id and replace :id with a number",
}

/* --- Third endpoint --
Path for my api documentation to be found which is the homepage of the url
*/
app.get('/documentation', (request, response) => {
  response.json(documentation);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running!`)
});