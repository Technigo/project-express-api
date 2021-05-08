# Express API Project
This is a project created during the Technigo Bootcamp, week 17. It was our first introduction to backend and the project itself was to build an API using Express.

The main goals were to learn:
- How to build an API in Node using Express
- How to create routes in Express
- Practice data manipulation in JavaScript - selecting, filtering, and limiting arrays

## The problem
My API has the following endpoints:

- https://sofias-express-api.herokuapp.com/ 
  Route to APIs first page listing all possible endpoints

- https://sofias-express-api.herokuapp.com/books
  Endpoints to show all books

- https://sofias-express-api.herokuapp.com/books/:id
  Endpoint with path param to search for a specific book by id. With error message if the book is not found. 

- https://sofias-express-api.herokuapp.com/search
  Endpoint with search path and with multiple possible query params to search for:
  - author: example ?author=rowling
  - title: example ?title=harry
  - sort books from high to low rating: ?highToLow=true
  - sort books from low to high rating: ?lowToHigh=true
  - show top twenty books with the highest rating: ?topTwenty=true
  - show top 50 books with most ratings: ?topFiFtyRatingsCount=true
  - show books over and under 400 pages: ?longStory=true, ?shortStory=true
  - search book by isbn: example ?isbn=439358078

  It is possible to combine several queries to filter more deeply. 

  I have chosen to only have error messages when searching for a specific book, with id or isbn. When using the other query params it returns an empty array if there is no match.

## View it live

https://sofias-express-api.herokuapp.com/
