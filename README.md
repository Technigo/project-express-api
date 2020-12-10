# Express API Project 🚅
For this project we were tasked to create a number of RESTful api endpoints using a specific data set and Express. The basic requirements were to create and implement:
1. At least two API routes.
2. An endpoint that returns a collection of results (an array if elements).
3. An endpoint that returns a single result (a single element).
4. An API that follows the RESTful approach.

## The problem 🧐
1. Started off by reading the materials about RESTful and CRUD approaches to structuring API's.
2. Watched Technigo videos which helped me understand more how to write the endpoints using the books data set I had choosen. And how to implement the query parameters for different parts of the object data e.g. author, title, language etc.
3. Got help from SO and the slack help channel regarding how to structure if statements used when using more than one query parameter.
4. Also got help with which conditional statements to write when using filter or find methods when returning the response of different types of data (string, number, boolean). 
5. Created error message if the data entered to the end point wasn't a match. Implemented this using if statement in my endpoints. 
6. I ended up creating two endpoints, one which returns the whole array of data with four queries (author, title, language and average rating) and also an endpoint that returns a single result using the id. Each array element has a bookID. 
If I was to create a frontend I could create a search field where the user can enter an author, title, language or average rating and they will get a specific response or maybe different buttons that filter on language. This is still something I would need to consider.
7. Added the documentation to it's own path so when someone is using the API they can understand better how to use the different endpoints.
8. Finally I deployed server.js to heroku.com which was super fun and easy! 

## Check out my deployed API 💥
https://books-deployment.herokuapp.com/

This url will take you to the documentation. After that it's just a case of choosing which endpoint you want to use! https://books-deployment.herokuapp.com/documentation 