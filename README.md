# 500books-API

This API gives you access to a list of about 500 books using some endpoints and filter options through query parameters. It's the first API I built and the first time for me trying backend development. The project was done during the Technigo bootcamp for frontend developers in fall 2020.

## What it does

The API gives access to a list of about 500 random books in different languages and some additional data about them. There is data about 
- title
- authors
- an avarage rating
- isdn numbers
- language
- number of pages
- number of ratings
- number of text reviews.
The dataset was provided by my tech school who gave me this project, so I don't have more information about how the books in the list were chosen. If you access the API through your browser, you will find a list of endpoints. 

## The approach

I created some endpoints to access all books, a certain book by its ID and all books in a certain language. Moreover, I included query parameters to filter for author name, average rating and if the book was rated at all. My aim was to create a RESTful API.

## Limitations

For now, I have only build a few endpoints and query paramenters. It would have been interesting to include some more filtering options.

## Tech used

- JavaScript ES6
- Express
- Express List Endpoints

## View it live

You can access the API here: https://books500.herokuapp.com/ 
