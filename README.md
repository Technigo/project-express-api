# Express API Project

Replace this readme with your own information about your project.

Start by briefly describing the assignment in a sentence or two. Keep it short and to the point.

## The problem

Describe how you approached to problem, and what tools and techniques you used to solve it. How did you plan? What technologies did you use? If you had more time, what would be next?

## View it live

Every project should be deployed somewhere. Be sure to include the link to the deployed project so that the viewer can click around and see what it's all about.



I asked myself: What kind of information is relevant to get from my API?
Autor and title was obvious, but I also added language since a few books are publised in different language.
I also choose to make a endpont on isbn because it's a uniqe number for a book and a nice way to find your exact book on a bookshop or library.
Top lists are always fun and useful, so made an endpoint to get the top 5 based on rating.


used also isbn because it's relevant when you do a search for a book at a bookshop och library.

the booklist first contains all of the bookData, but when it enters the first filter (autor) it gets smaller before entering the second filter (title).
in this way the filter doesn't happen on the whole array of booksData for every query. It also makes it easy to add more querys if I also would like to filter on rating for example.