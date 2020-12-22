# Express API Project

In  this project I have built my first backend project where I created my own book- API using Node and Express. 📚

## The problem
I created different endpoints in the API, of which some return an array of data and some a single item.I achieved 
this by using the filter() and find() methods.

The endpoins are:
* /books - returns the whoe array of book objects.
* /books/:id - returns a bokk with a chosen id.
* /authors/:authors - returns all books of a chosen author.
* /titles/:title - returns a book with a certain title.
* /language - Query search for language code.

I've also created a error messages that will be shown if the response status is 404.


## Tech used
* JavaScript
* Node.js
* Express

## View it live

https://saras-book-api.herokuapp.com/
