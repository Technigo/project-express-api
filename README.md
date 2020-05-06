# Express API Project
Netflix titles API built in Node using Express. The task was to create an API with different endpoints. The API uses a static data set stored as a JSON-file. Using the array methods .filter(), .slice() and .find(), the items returned in the responses are limited according to the endpoint or query.

The following endpoints are available:

Home: /

Titles: /titles

Title by id: /titles/:id

Titles by year: /year/:year

Queries can be used to limit the /titles endpoint:
Select page: /titles?page=:page
Search by country: /titles?country=:country
Search by director: /titles?director=:director

## Learning objectives
- How to build an API in Node using Express
- How to create routes in Express
- Practice data manipulation in JavaScript (selecting, filtering, and limiting arrays)

## Technologies used
- Node.js
- Express
- JavaScript ES6

## View it live
https://anna-project-express-api.herokuapp.com/
