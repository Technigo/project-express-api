# Express API Project

Book API built in Node using Express. The following endpoints are available:

Root: /
Books: /books
Book by id: /books/:id

Queries can be used to limit the `/books` endpoint:
Select page: /books?page=:page
Search books by author: /books?author=:author
Search books by title: /books?title=:title

## The problem

The task was to create an API with a couple of endpoints. The API uses a static data set stored as a JSON file. Using the array methods `.sort()`, `.filter()`, .`slice()` and `.find()`, the items returned in the responses are limited.

## Learning objectives

* How to build an API in Node using Express
* How to create routes in Express
* Practice data manipulation in JavaScript - selecting, filtering, and limiting arrays

## Tech

* Node.js
* Express
* JavaScript ES6

## View it live

https://fridamaria-book-api.herokuapp.com/