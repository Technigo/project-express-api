# Express API Project

In this project I have built my first backend project where I created my own API using Node and Express. The API have some RESTful endpoints where some return an array of data and some a single item.

## The problem

I did not use any database in this project to I used a hard-coded set of data, stored as a JSON file in the project folder. To make different choices about what to show in the different endpoint I used the methods `.find()`, `.filter()`, `.sort()` and `.slice()`. 

In my project I use a JSON file with 500 book reviews. First I created one endpoint retrieving all data. Then I made sorting on book ID and author(s). For the routes retrieving one single books or books from a specific author(s) I added error messages if the user choose an ID or author that are not existing. 

I did also an endpoint showing the 20 books with highest rating by using `.filter()`, `.sort()` and `.slice()` methods. 
Later I added query parameters to filter out the books with an average rating above 4.0 and a `.slice()`method showing 50 books per side wehre the user can choose with query parameter which side to show (between 1 and 10).

If I get more time I will add error messages if a non existing endpoint is entered. I will also build a frontend site which uses the API to show the data. I would also like to learn how to create useful documentation for my endpoints and to present it in a good way. 

## Learning Objectives

- How to build an API in Node using Express

- How to create routes in Express

- How to deploy Node projects

- How to make RESTful API's

- How to manipulate data in JavaScript by selectiong, filtering and limiting arrays

## Tech

- Node

- API's 

- Express

## View it live

Link to my API start page: https://gabriella-books-api.herokuapp.com/
