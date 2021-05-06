# Express API Project

This project was about building an API using Express and my first introduction to backend.

# The project

I asked myself: What kind of information is relevant to get from my API?
Autor and title was obvious, but I also added language since a few books are publised in different language.
I also choose to make a endpont on isbn because it's a uniqe number for a book and a nice way to find your exact book on a bookshop or library.op lists are always fun and useful, so made an endpoint to get the top 5 based on rating.

Besides endpoints, I also did a few querys (author, title, language):
The booklist first contains all of the bookData, but when it enters the first filter (author) it gets smaller before entering the second filter (title) and then smaller when it gets to the third filter (language).
In this way the filter doesn't always happen on the whole array of booksData for every query. It also makes it easy to add more querys if I also would like to filter on rating for example. I added a conditional in the beginning to prevent the user from getting all of the booksData if they don't type in any of the parameters.

# Tech & Tools used
* RESTful API
* Postman
* JavaScript
* Express
* Node

# List of endpoints

* "/"   - You see a list of endpoints
* "/books"-(Three querys on author, title & language)
* "/top5" -List the 5 books with the highest rating
* /textreviews -List the 20 books with most textreviews
* "/isbn" -Find a book using it's isbn-nr
* "/id" - Find a book using the id
* authior.???
* "/lang" - Find books with a specific language


## View it live

Every project should be deployed somewhere. Be sure to include the link to the deployed project so that the viewer can click around and see what it's all about.
