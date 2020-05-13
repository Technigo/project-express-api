# Express API Project

Book API built with Node using Express.

## Description

The API uses a hard-coded set of data, stored as a JSON file. The returned data from the responses are limited with different array methods.

Available endpoints:

Routes | Path
--- | ---
root | `/`
books | `/books`
book by id | `/books/:id`

Queries can be used to filter/sort the `/books` endpoint.

Query | Path | Value
--- | --- | ---
title | `?title=:title` | *string*
author | `?author=:author` | *string*
rating | `?rating=:rating` | *integer*
pages | `?pages=:pages` | *hundred*
sort | `?sort=:sort` | *'rating' / 'pages'*


## Tech
- Node.js
- Express
- Javascript ES6

## Deployed
https://express-api-books.herokuapp.com/
