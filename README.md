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
6. I ended up creating two endpoints, one that returns the data based on five query parameters (author, title, language, average rating and page) and one that returns a single result using an id parameter. 
The id entered in the endpoint is checked against the bookID in the books array and if it exists it will return that array element. 
When using the page query parameter the user can enter a number between 1 and 10. Depending on the number entered a list of 50 books that corresponds with the number will be returned. This can be used in the frontend to return 50 books per page and set up buttons to navigate between each page. 
7. In terms of the frontend I could use these endpoints to do a number of things. This could include implementing pages which the user can browse through rather than returning the whole array of data (which is currently 499 books), a search input where the user can search specific books based on author, title, language and average rating and also buttons where the user could generate a list of books based on language or average rating.
8. Added the documentation to it's own path so when someone is using the API they can understand better how to use the different endpoints.
9. Finally I deployed server.js to heroku.com which was super fun and easy! 

## Check out my deployed API 💥
https://books-deployment.herokuapp.com/

This url will take you to the documentation. After that it's just a case of choosing which endpoint you want to use! https://books-deployment.herokuapp.com/documentation 