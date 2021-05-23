# Express API Project 📚

This project was about building an API using Express and was my first introduction to backend.

# The project

I asked myself: What kind of information is relevant to get from my API?
Autor and title was obvious, but I also added language since a few books are publised in a different language.
I decided to make an endpoint on isbn because it's a uniqe number for a book and a nice way to find your exact book on a bookshop or library. Top lists are always fun and useful, so made an endpoint to get the top 5 based on rating and one toplist of the 20 books with most reviews.

Besides endpoints, I also did a few querys (author, title, language):
The booklist first contains all of the bookData, but when it enters the first filter (author) it gets smaller before entering the second filter (title) and then smaller when it gets to the third filter (language).
In this way the filter doesn't always happen on the whole array of booksData for every query. It also makes it easy to add more querys if I would like to filter on rating for example. I added a conditional in the beginning to prevent the user from getting all of the booksData if they don't type in any of the parameters. The data I have now is not very large so it would not be a problem to display them all, but in some other case it could be a massive list and therefor maybe not a good idea to display it all in a list.

If i had more time, I would have:
- added more querys and endpoints, for example an endpoint that lists all authors
- added API documentation
- made a frontend to the project.

# Tech & Tools used 💻
* RESTful API
* Postman
* JavaScript
* Express
* Node

# List of endpoints

* '/'          - You see a list of endpoints
* '/books'     -Get all the books and the possibility to query on author, title & language
* '/top5'      -List the 5 books with the highest rating
* '/top20' -List the 20 books with most textreviews
* '/books/isbn/:isbn'      -Find a book using it's isbn-nr
* '/books/:id'        -Find a book using the id
* 'books/lang/:lang'      - Find books with a specific language


## View it live ✨

Start:
https://books-api-2021.herokuapp.com/

Example of endpoints:
https://books-api-2021.herokuapp.com/top5

https://books-api-2021.herokuapp.com/top20

https://books-api-2021.herokuapp.com/books/isbn/1400052920

https://books-api-2021.herokuapp.com/books?author=J.K.%20Rowling&title=prisoner&language=eng
