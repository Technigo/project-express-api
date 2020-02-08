# Netflix API with Express and Joi

### Summary

A custom API created with Express and Joi to provide information about movies and TV shows on Netflix.

### Implementation details

In this project I have implemented API routes in Express to handle GET, POST, PUT and DELETE requests. Instead of using a database in my backend I have used a JSON dataset with movies and TV shows from Netflix.

When building an API data validation is very important. To combat invalid data I have used Joi, a powerful schema description language and data validator for JavaScript, to validate data in POST and PUT requests.

To make sure that the logic is working properly and that the endpoints are responding with correct status codes I have used the Jest Testing Framework for unit testing.

### Technologies used

- JavaScript ES6+
- [Express](https://expressjs.com/)
- [Joi](https://github.com/hapijs/joi)
- [Jest](https://jestjs.io/)

### Where can you see it in action?

URL to Custom Netflix API documentation: https://express-netflix-api.herokuapp.com/
