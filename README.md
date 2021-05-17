# Express API Project
This is a project made during the Technigo bootcamp. The assignment was an introduction to backend, creating an API using Express. The API should have at least a couple of RESTful endpoints which return either an array of data, or a single item (from hard-coded set of data in JSON-file).

## My project
I used a dataset about bookreviews. My API contains queries for filtering on author, title and language, and if neither is queried all books/objects will be shown. If the query doesn't return a result the API will show an empty array. I made params to find ID and ISBN, and filter on title and languages. If nothing is found an error message is shown, and for language it also lists all available languages. I also added endpoints to list a top-10 list of books with highest average rating in reviews, and to list all available authors in a sorted list without duplicates. 

There's probably a lot more combinations and useful info that one could be able to search for, but this is a start :)

## Techs/tools used
* Node.js
* Express
* JavaScript

## Endpoints
* '/' - See a list of endpoints
* '/book' - See all books
* '/books?author=[...]&title=[...]&lang=[...] - Search for authors and/or title and/or language-code
* '/books/[id] - Search for book by ID
* '/books/isbn/[isbn] - Search for book by ISBN
* '/books/titles/[title]' - Search for book by title
* '/books/languages/[lang]' Search for book by language-code
* '/books/top10' - Get a list of the 10 books with the highest rating
* '/books/authors' - Get a list of all available authors

## View it live
https://books-api-express.herokuapp.com/
