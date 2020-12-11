# Express API Project

API of different books created with express and node.js. 

### Endpoints: 
/books 
lists all books in the API

/books/top-rated
lists the 20 books with the highest rating

/books/:id 
lists the book with correspondig ID in the API

### Queries: 
title - /books?title={search word}
lists every book which has the given parameter in its title 

authors - /books?authors={search word}
lists every book which has the given parameter in its field of authors

examples: 
/books?title=Rings
/books?authors=Tolkien

## The problem

I began with researching the dataset of the books array. I tried to find what information there was for each book and what of that would be the most interesting and common parts that a user would want to find and display. Then I created the first endpoint of all the books, the endpoint of each individual book based on id and then tried my hand at creating a query for the author. I used the filter method combined with includes to have a more forgiving approach if the user did not type exactly the way the dataset was written. The title query had not only strings but also integears wich made it the includes part not to work, but by converting the title to a string it solved the problem. 


## View it live

The live API: https://express-first-api.herokuapp.com/