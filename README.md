# API with Express, Joi and Jest (Part 1)

### Summary

A custom API created with Express and Joi to provide information about movies and TV shows on Netflix.

### Implementation details

In this project I have implemented API routes in Express to handle GET, POST, PUT and DELETE requests. Instead of using a database in my backend I have used a JSON dataset with movies and TV shows from Netflix.

When building an API data validation is very important. To combat invalid data I have used Joi, a powerful schema description language and data validator for JavaScript, to validate data in POST and PUT requests.

To make sure that the logic is working properly and that the endpoints are responding with correct data and status codes I have used the Jest Testing Framework for unit testing. The current implementation works really good and saves me a lot of time when I don't constantly have to test the endpoints manually when changing the logic.

### Technologies used

- JavaScript ES6+
- Node.js
- [Express](https://expressjs.com/)
- [Joi](https://github.com/hapijs/joi)
- [Jest](https://jestjs.io/)

### Where can you see it in action?

URL to Custom Netflix API documentation: https://express-netflix-api.herokuapp.com/
