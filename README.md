# Express API Project 🚆

>For this project, I have used the book API dataset in the data file, and built my very first server using Node.js and Express.

🌈Endpoints:

*1.Root: `/`
*2.Books: `/books` (shows first 50 books to prevent delayed response when API loading)
*3.Book ID: `/books/id/(bookID number)`
*4.Author(s): `/books/author/(name)`

*Filtering:*

* By average ranking:

*High: `/books?average_rating=high`
*Low: `/books?average_rating=low`

* By number of pages:

*High volume of pages: `/books?num_pages=lots`
*Fewer pages: `/books?num_pages=few`

* By author:
*`/books?author=author`

* By title:
*`/books?title=title`

## How I went about it

First step to handling the API response was to filter to the first 50 books by using the `.slice()` method, in order to prevent delay in response. By using the `.sort()` method and creating functions, I have used the average rating and the number of pages to iterate through the array of books and display the ones that match the criteria. 

Next, I used the `.filter()` method and applied it similarily to filter both through authors and title. This was slightly more tricky to do, since I had to take in consideration that the user won't always enter the name of the author/title perfectly. 

## Tech

* ✨JS
* ✨Node.js
* ✨Express

## View it live

Every project should be deployed somewhere. Be sure to include the link to the deployed project so that the viewer can click around and see what it's all about.
