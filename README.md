# Express API Project 🚅

I've created my first API using Express containing data about books.


## The problem

I began thinking about what kind of endpoints would be nice to have for the data I chose (books). After that I started to create the endpoints home, all books, 20 first books by top rating, short read and id. I also implemented filters via query parameters to filter the data returned from endpoints which return an array of data. I continuously tested my API using Postman. When searching for a book by id, I've handled when the specific id doesn't exist and return some useful data in the response. 

I chose to use the npm package express-list-endpoints to list the endpoints in the home endpoint.

If I had more time, I would implement a frontend to by API where I display the documentation for my API. I also would've liked to implement 'pages' using .slice() to return only a selection of results from the array and then add a query parameter to allow the user to ask for the next 'page'.


## View it live

See my live API here: https://project-express-api-isabellam5.herokuapp.com/ 


## Documentation

### ENDPOINTS
- ```GET /```

Displays all endpoints for this API using npm package express-list-endpoints.

#### BOOKS
- ```GET /books```
- ```GET /books/toprating```
- ```GET /books/shortread```

Endpoints for the API.

#### SINGLE BOOK
- ```GET /books/:id```

Endpoint for a single book by id.


### QUERIES

Use endpoint ```GET /books```

Filter by either author or title (optional). Case insensitive.

* Example query for author: ```GET /books?author=adams```
* Example query for title: ```GET /books?title=bill```