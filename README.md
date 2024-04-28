# Project Express API

For this weeks project we're using Express.js to create an API.

## The problem

I don't know if I've missunderstood the assignment or if it's really simple this week.
Half of it was done out of the box - most of the rest was just copy paste from this weeks materials.

I installed Express List Endpoints and added the route method, and played around a bit with filters.
Added pages beacuse, why not.
Instead of creating a front though, I think I'll will move on to next weeks project...

### Available endpoints

- "/", API overview
- "/books", all books
- "/books/popular", top 10 books by average rating
- "/books/:bookId", specific book by ID
- "authors/:author", books by specific author
- "search", with query - search for anything in books value

### Available queries

- "q", search
- "page", pagination, 10 books per page
- "lang", all books with specific language code
- "isbn", specific book by isbn
- "isbn13", specific book by isbn13

### Requirements

- Your API should have at least 3 routes. Try to push yourself to do more, though!
  - The endpoint "/" should return documentation of your API using e.g. [Express List Endpoints](https://www.npmjs.com/package/express-list-endpoints)
  - A minimum of one endpoint to return a **collection** of results (array of elements).
  - A minimum of one endpoint to return a **single** result (single element).
- Your API should be [RESTful](https://www.notion.so/23473abe980e40aaa932914751055d22?pvs=21).

## View it live

[Project Express API on render.com](https://project-express-api-d6i6.onrender.com)
