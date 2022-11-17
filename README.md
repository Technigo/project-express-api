# Project Express API

The aim of this project is to create an API with RESTful endpoints returning either an array of data or a single item.

## The problem

Node.js and framework Express is used to create the API and run the server 

ENDPOINTS CREATED:

/books - returns all the books with all their data, has two filters:

  /books?author=Firstname Lastname  - returns all books by specific author
  /books?top=true - returns books with a rating higher than 4.3 

/books/:id - returns a single book according to a specific id entered 

With more time, I plan to add pagination to limit the number of results shown for a request, as well as implement a frontend part for this project to help isualize how the API could be used.

## View it live
Google Cloud Platform is used to deploy the API:

https://project-express-api-eyln4nn5aa-lz.a.run.app/books