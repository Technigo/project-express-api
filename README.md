# Express API Project

This is a project where I've created my first API using the Express server.

The API is about books and uses mainly the get-method but also has a post-method.
It has a few different paths and also uses query for further filtration.

## The problem

I started out reaching for these goals:
- The API should have at least 2 routes. Try to push yourself to do more, though!
- A minimum of one endpoint to return a collection of results (array of elements)
- A minimum of one endpoint to return a single result (single element).
- The API should be RESTful

Then I also implemented the following:
- On routes which return a single item, handle when the item doesn't exist and return some useful data in the response.
- Accept filters via query parameters to filter the data you return from endpoints which return an array of data.

I started working on dummy-enpoints as well, but then I made the decision to actually create the post-method in one of the paths instead. This was a bit complex, since I had to figure out how to update a file and add objects to that array without using a database. The solution was to install the file-system dependencies and use it to read and write to local files.

## Next up
If I had more time, I'd like to have written a documentation about this API. 
However, I might update the project with a documentation later on.
I'd also like to add a DELETE-request, since this api now has four books I've added myself. 
I might also use this in a front-end application in the future.

## Tech
* Node.js
* Javascript
* File-system library

## View it live

<a href='https://project-api-books-emelie.herokuapp.com'>Project Express API</a>

## Author
* <a href="https://github.com/emeliesv">Emelie Svensson</a>